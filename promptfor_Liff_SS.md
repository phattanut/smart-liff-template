🎯 Objective
ต้องการให้ช่วยเขียนโค้ดสำหรับระบบค้นหาข้อมูลยา โดยทำงานผ่าน LIFF (LINE Front-end Framework)
ผู้ใช้จะพิมพ์ชื่อยา → ระบบค้นหาใน Google Sheets → แสดงผลข้อมูลยา → และสามารถส่งผลลัพธ์กลับเข้า LINE Chat ได้

📊 1. โครงสร้างข้อมูลใน Google Sheets
Sheet จะมีโครงสร้างดังนี้:
Column A: ชื่อยา (Generic Name / Trade Name)
Column B: กลุ่มยา (Drug Group)

เงื่อนไขการค้นหา
ต้องรองรับ:
ค้นหาแบบ Case-insensitive (ไม่สนตัวพิมพ์เล็ก-ใหญ่)
ค้นหาแบบ Partial match / คำใกล้เคียง (พิมพ์บางส่วนก็หาเจอ)

⚙️ 2. สิ่งที่ต้องการในไฟล์ code.gs (Google Apps Script)
ให้เขียนโค้ดที่ประกอบด้วย: doGet() ใช้สำหรับ serve หน้า HTML ของ LIFF App

searchDrug(name)
ฟังก์ชันที่ทำหน้าที่: รับชื่อยาจากหน้าเว็บ, ค้นหาใน Google Sheets, คืนค่าข้อมูลแถวที่พบเป็น JSON Object เช่น:

💻 3. สิ่งที่ต้องการในไฟล์ index.html
UI Requirements
ใช้:
Bootstrap 5 สำหรับ Layout
SweetAlert2 สำหรับ Alert

ต้องมีองค์ประกอบ:
ช่อง Input สำหรับพิมพ์ชื่อยา
ปุ่ม "ค้นหา"
ส่วนแสดงผลลัพธ์ ที่โชว์: ชื่อยา, กลุ่มยา, รายละเอียด (ถ้ามี)

📱 LIFF Features
ต้องมี Logic ดังนี้:
เชื่อมต่อ LIFF SDK
เรียกใช้งาน liff.init()

เมื่อค้นหาพบข้อมูล:
แสดงปุ่ม "ส่งข้อมูลเข้าแชท"

เมื่อกดให้ใช้ liff.sendMessages() ส่งข้อความสรุป เช่น:
ยา: [ชื่อยา]
กลุ่มยา: [กลุ่มยา]

หลังส่งสำเร็จ → ให้ ปิดหน้าต่าง LIFF อัตโนมัติ

❗ 4. Error Handling
ต้องมีการจัดการกรณี:
ไม่พบชื่อยา → แสดง SweetAlert แจ้งว่า: "ไม่พบข้อมูลยาในระบบ"

🧩 5. Coding Style Requirements
ต้องการโค้ดที่:
Clean code อ่านง่าย
แยก Logic และ UI ชัดเจน
มี Comment อธิบายส่วนสำคัญ

✅ Output Format ที่ต้องการจาก AI
ให้ตอบเป็น:
โค้ด code.gs
โค้ด index.html
พร้อมคำอธิบายสั้น ๆ วิธี Deploy และตั้งค่า LIFF
