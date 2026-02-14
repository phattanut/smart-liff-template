// --- ส่วนการเรียกใช้งาน Script Properties ---
const props = PropertiesService.getScriptProperties();

// ดึงค่าจาก Properties มาเก็บไว้ในตัวแปร (ไม่ต้องระบุ ID จริงในนี้แล้ว)
const SHEET_ID      = props.getProperty('SHEET_ID');
const SHEET_NAME    = props.getProperty('SHEET_NAME') || "data"; // ถ้าไม่ได้ตั้งชื่อ ให้ใช้ "data" เป็นค่าเริ่มต้น
const CHANNEL_ACCESS_TOKEN = props.getProperty('CHANNEL_ACCESS_TOKEN');
const LIFF_ID       = props.getProperty('LIFF_ID');

/**
 * ฟังก์ชัน doGet: ทำหน้าที่เป็น JSON API ส่งข้อมูลให้ GitHub
 */
function doGet(e) {
  try {
    // ใช้ตัวแปร SHEET_ID ที่ดึงมาจาก Properties
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // ตัดหัวตาราง (แถวที่ 1) ออก
    data.shift(); 
    
    const result = data.map(row => ({ 
      name: (row[0] || "").toString(), 
      category: (row[1] || "").toString() 
    }));
    
    // ส่งออกเป็น JSON
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (e) {
    // กรณีเกิดข้อผิดพลาด เช่น หา Sheet ไม่เจอ หรือลืมตั้งค่า Properties
    return ContentService.createTextOutput(JSON.stringify({ error: e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getDrugData() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("หา Sheet ชื่อ " + SHEET_NAME + " ไม่เจอ");

    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return []; 

    data.shift(); // ตัดหัวตาราง
    return data.map(row => ({ 
      name: (row[0] || "").toString(), 
      category: (row[1] || "").toString() 
    }));
  } catch (e) {
    return [{ name: "Error", category: e.toString() }]; 
  }
}

function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    const event = contents.events[0];
    if (event.type === "message" && event.message.type === "text") {
      const replyToken = event.replyToken;
      const userMessage = event.message.text.trim(); 

      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName(SHEET_NAME);
      const data = sheet.getDataRange().getValues();
      
      let matches = [];
      for (let i = 1; i < data.length; i++) {
        if (data[i][0].toString().toLowerCase().includes(userMessage.toLowerCase())) {
          matches.push({ name: data[i][0], category: data[i][1] });
        }
      }

      if (matches.length === 0) {
        replyLine(replyToken, "❌ ไม่พบ: " + userMessage);
      } else if (matches.length === 1) {
        replyLine(replyToken, "💊 ยา: " + matches[0].name + "\n📂 กลุ่ม: " + matches[0].category);
      } else {
        replyWithQuickReply(replyToken, matches.slice(0, 13), matches.length);
      }
    }
  } catch (e) { console.error(e.toString()); }
}

function replyWithQuickReply(replyToken, list, total) {
  let items = list.map(d => ({
    "type": "action",
    "action": { "type": "message", "label": d.name.substring(0, 20), "text": d.name }
  }));
  sendToLine({
    "replyToken": replyToken,
    "messages": [{ "type": "text", "text": "🔎 พบ " + total + " รายการ:", "quickReply": { "items": items } }]
  });
}

function replyLine(replyToken, text) {
  sendToLine({ "replyToken": replyToken, "messages": [{ "type": "text", "text": text }] });
}

function sendToLine(payload) {
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", {
    "method": "post",
    "headers": { "Content-Type": "application/json", "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN },
    "payload": JSON.stringify(payload)
  });
}

function FORCE_TEST_DATA() {
  console.log("🛠 กำลังทดสอบดึงข้อมูล...");
  
  // เรียกฟังก์ชันหลักของคุณโดยตรง
  var result = getDrugData();
  
  if (result.length > 0 && result[0].name === "Error") {
     console.log("❌ พังครับ: " + result[0].category);
  } else if (result.length === 0) {
     console.log("⚠️ เชื่อมต่อได้ แต่ไม่มีข้อมูล (0 rows)");
  } else {
     console.log("✅ สำเร็จ! เจอข้อมูล " + result.length + " รายการ");
     console.log("ตัวอย่าง: " + JSON.stringify(result[0]));
  }
}
