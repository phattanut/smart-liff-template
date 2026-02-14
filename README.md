# smart-liff-template
# 💊 ระบบค้นหายา Smart Search (Template)

โปรเจกต์นี้เป็นตัวอย่างการสร้าง LIFF เพื่อค้นหายาจาก Google Sheet 
โดยใช้สถาปัตยกรรม GitHub (หน้าบ้าน) + Google Apps Script (หลังบ้าน)

# link gg sheet ข้อมูลทำ chat bot จำลอง
https://docs.google.com/spreadsheets/d/1g_IDyixHNnqvb0-9bTPfqKu7gl2JR53CHvanheODbNE/edit?usp=sharing

### 🚀 ขั้นตอนการนำไปใช้งาน
1. **เตรียม Google Sheet:** สร้าง Sheet ที่มีคอลัมน์ A (ชื่อยา) และ B (กลุ่มยา)
2. **ตั้งค่าหลังบ้าน (GAS):** - ก๊อปปี้ไฟล์ `Code.gs` ใน Repo นี้ไปวางใน Apps Script
   - แก้ไข `SHEET_ID` และ `CHANNEL_TOKEN` เป็นของคุณเอง
   - Deploy เป็น Web App (เลือก Anyone)
3. **ตั้งค่าหน้าบ้าน (GitHub):**
   - Fork โปรเจกต์นี้ไปเป็นของคุณเอง
   - แก้ไขไฟล์ `index.html` โดยใส่ `LIFF_ID` และลิงก์ `GAS_URL` ของคุณ
4. **เชื่อมต่อ LINE:** นำลิงก์ GitHub ไปใส่ใน Endpoint URL ของ LIFF Console
