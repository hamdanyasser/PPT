# العقل البشري VS التكنولوجيا | Human Brain VS Technology

<div dir="rtl">

## 🧠 نبذة عن المشروع

إنفوجرافيك عربي ثابت على الويب يقارن بين **العقل البشري** و**التكنولوجيا** في عدة جوانب:
- ⚡ سرعة المعالجة
- 💡 الإبداع والتفكير النقدي
- 🔄 التعلم والتكيف

المشروع مصمم كـ **إنفوجرافيك عمودي** (Vertical Infographic) يشبه ملصق طويل يمكن تصديره كصورة أو PDF لإرساله للعملاء.

## ✨ المميزات

- 🎨 تصميم عربي بالكامل مع دعم RTL
- 📜 تخطيط عمودي ثابت يمكن التمرير خلاله
- 📱 تصميم متجاوب يعمل على جميع الأجهزة
- 🎭 رسوم متحركة CSS خفيفة وبسيطة
- 🖼️ جاهز للتصدير كصورة أو PDF
- 🚫 لا يتطلب JavaScript (ثابت تمامًا)
- 🎨 ألوان نظيفة ومريحة للعين

## 📂 بنية المشروع

</div>

```
PPT/
├── index.html      # الهيكل الأساسي والمحتوى (HTML فقط)
├── styles.css      # التصاميم والرسوم المتحركة (CSS فقط)
└── README.md       # هذا الملف
```

<div dir="rtl">

## 🚀 كيفية التشغيل محليًا

### 1. **فتح الملف مباشرة**
ما عليك سوى فتح ملف `index.html` في أي متصفح حديث (Chrome, Firefox, Safari, Edge).

### 2. **استخدام خادم محلي (اختياري)**
إذا كنت تفضل استخدام خادم محلي:

```bash
# باستخدام Python 3
python -m http.server 8000

# باستخدام Node.js (npx)
npx serve

# باستخدام PHP
php -S localhost:8000
```

ثم افتح المتصفح على: `http://localhost:8000`

## 📸 تصدير الإنفوجرافيك كصورة أو PDF

### الطريقة 1: لقطة شاشة كاملة (Screenshot)

**على Chrome / Edge:**
1. افتح الملف `index.html` في المتصفح
2. اضغط `Ctrl+Shift+I` (أو `Cmd+Option+I` على Mac) لفتح أدوات المطور
3. اضغط `Ctrl+Shift+P` (أو `Cmd+Shift+P` على Mac) لفتح قائمة الأوامر
4. اكتب: `Capture full size screenshot`
5. سيتم حفظ صورة كاملة للصفحة تلقائيًا

**على Firefox:**
1. افتح الملف `index.html` في المتصفح
2. اضغط بزر الماوس الأيمن على الصفحة
3. اختر "التقاط لقطة شاشة" (Take Screenshot)
4. اختر "حفظ الصفحة الكاملة" (Save Full Page)

### الطريقة 2: طباعة كـ PDF

1. افتح الملف `index.html` في المتصفح
2. اضغط `Ctrl+P` (أو `Cmd+P` على Mac)
3. اختر "حفظ كـ PDF" (Save as PDF) من قائمة الطابعات
4. اضبط الإعدادات:
   - التخطيط: عمودي (Portrait)
   - الهوامش: لا شيء (None)
   - خيارات الخلفية: تفعيل (Enable)
5. احفظ الملف

### الطريقة 3: أدوات خارجية

استخدم أدوات مثل:
- [GoFullPage](https://chrome.google.com/webstore/detail/gofullpage) (إضافة Chrome)
- [Awesome Screenshot](https://www.awesomescreenshot.com/) (إضافة متعددة المتصفحات)

## 🎨 تخصيص الإنفوجرافيك

### تعديل النصوص
افتح ملف `index.html` وعدّل المحتوى داخل عناصر `<section>`.

### تعديل الألوان
افتح ملف `styles.css` وعدّل:
```css
/* لون العنوان الرئيسي */
.section-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* لون بطاقات العقل البشري */
.brain-card {
    border-top: 5px solid #4facfe;
}

/* لون بطاقات التكنولوجيا */
.tech-card {
    border-top: 5px solid #a8a8a8;
}

/* لون قسم الخاتمة */
.section-conclusion {
    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}
```

### تعديل أحجام الخطوط
في ملف `styles.css`:
```css
.main-title {
    font-size: 2.8rem;  /* حجم العنوان الرئيسي */
}

.section-title {
    font-size: 2.2rem;  /* حجم عناوين الأقسام */
}

.card-text {
    font-size: 1.2rem;  /* حجم النصوص داخل البطاقات */
}
```

## 🛠 التقنيات المستخدمة

- **HTML5**: الهيكل والمحتوى
- **CSS3**: التصاميم والرسوم المتحركة والتخطيط
- **Google Fonts (Tajawal)**: خط عربي جميل وواضح
- **لا يوجد JavaScript**: إنفوجرافيك ثابت بالكامل

## 📋 متطلبات النظام

- ✅ متصفح حديث (Chrome, Firefox, Safari, Edge)
- ✅ لا يتطلب أي مكتبات خارجية
- ✅ يعمل دون اتصال بالإنترنت (بعد التحميل الأول للخط)

## 🌐 نشر المشروع على الإنترنت

### GitHub Pages

1. **رفع الملفات إلى GitHub**:
```bash
git init
git add .
git commit -m "Add Arabic brain vs tech infographic"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/brain-vs-tech.git
git push -u origin main
```

2. **تفعيل GitHub Pages**:
   - اذهب إلى Settings → Pages
   - اختر Branch: `main` و Root: `/`
   - احفظ واحصل على رابط موقعك!

### Netlify / Vercel

ما عليك سوى سحب وإفلات مجلد المشروع على:
- [Netlify Drop](https://app.netlify.com/drop)
- [Vercel](https://vercel.com/new)

## 📐 الأقسام الخمسة

### 1️⃣ العنوان
- عنوان رئيسي: "العقل البشري VS التكنولوجيا… مين الأسرع؟"
- رسم توضيحي للعقل والروبوت مع علامة VS

### 2️⃣ سرعة المعالجة
- مقارنة بين سرعة العقل البشري والتكنولوجيا
- بطاقتان جانبيتان مع رسوم توضيحية

### 3️⃣ الإبداع والتفكير النقدي
- مقارنة القدرات الإبداعية لكل منهما
- رسوم توضيحية للأفكار والبيانات

### 4️⃣ التعلم والتكيف
- كيف يتعلم كل منهما ويتكيف
- مراحل التعلم المرئية

### 5️⃣ الخاتمة
- رسالة ختامية عن التعاون بين الإنسان والآلة
- أيقونات متحركة خفيفة

## 🤝 الاستخدام مع عملاء غير تقنيين

هذا الإنفوجرافيك مثالي لـ:
- ✅ إرسال صورة PDF للعملاء
- ✅ عرض تقديمي بسيط
- ✅ منشور على وسائل التواصل الاجتماعي
- ✅ طباعة كملصق (A3/A4)

---

</div>

## 🌍 English Version

### About

A **static vertical infographic** web page in Arabic comparing the **Human Brain** vs **Technology** across multiple dimensions:
- Processing speed ⚡
- Creativity and critical thinking 💡
- Learning and adaptation 🔄

### Features

- Full Arabic RTL support
- Vertical scrollable layout (poster-style)
- Responsive design for all devices
- Lightweight CSS animations
- Ready to export as image or PDF
- No JavaScript required (fully static)
- Clean, modern design

### Quick Start

1. Open `index.html` in any modern browser
2. Scroll through the 5 sections
3. Export as image or PDF (see instructions above)

### Export Options

**Chrome/Edge:**
1. Open DevTools (`Ctrl+Shift+I`)
2. Open Command Palette (`Ctrl+Shift+P`)
3. Type: `Capture full size screenshot`

**Firefox:**
1. Right-click on page
2. Select "Take Screenshot"
3. Choose "Save Full Page"

**Print to PDF:**
1. Press `Ctrl+P` (or `Cmd+P` on Mac)
2. Select "Save as PDF"
3. Adjust settings: Portrait, No margins, Enable backgrounds

### Technology Stack

- Pure HTML5 (structure and content)
- Pure CSS3 (styling, animations, layout)
- Google Fonts: Tajawal (Arabic font)
- No JavaScript (fully static)

### Use Cases

Perfect for:
- Sending to non-technical clients as PDF/image
- Social media posts
- Print as poster
- Simple presentations

### Customization

- **Text**: Edit `index.html`
- **Colors**: Edit `styles.css` (gradients and borders)
- **Fonts**: Edit `styles.css` (font sizes)

---

**Made with ❤️ for comparing Human Intelligence and Technology**

<div dir="rtl">

صُنع بـ ❤️ لمقارنة الذكاء البشري والتكنولوجيا

</div>
