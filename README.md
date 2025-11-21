# العقل البشري VS التكنولوجيا | Human Brain VS Technology

<div dir="rtl">

## 🧠 نبذة عن المشروع

إنفوجرافيك تفاعلي على الويب يقارن بين **العقل البشري** و**التكنولوجيا** في عدة جوانب:
- 🚀 سرعة المعالجة
- 💡 الإبداع والتفكير النقدي
- 📚 التعلم والتكيف

المشروع مصمم كـ **عرض تقديمي انسيابي** (slideshow) يتكون من 5 شرائح بتصميم عصري وحركات انتقالية سلسة.

## ✨ المميزات

- 🎨 تصميم عربي بالكامل مع دعم RTL
- 🎬 انتقالات تلقائية بين الشرائح مع توقيتات محددة
- 📱 تصميم متجاوب يعمل على جميع الأجهزة
- ⌨️ دعم التحكم بلوحة المفاتيح والسحب باللمس
- 🎭 رسوم متحركة CSS مخصصة لكل شريحة
- ♿ دعم إمكانية الوصول (Accessibility)
- 📊 شريط تقدم ديناميكي
- 🎮 أزرار تحكم بسيطة وواضحة

## 📂 بنية المشروع

</div>

```
PPT/
├── index.html      # الهيكل الأساسي للصفحة والمحتوى
├── styles.css      # التصاميم والرسوم المتحركة
├── script.js       # منطق التحكم بالشرائح
└── README.md       # هذا الملف
```

<div dir="rtl">

## 🚀 كيفية التشغيل محليًا

1. **استنساخ المشروع** (أو تحميل الملفات):
   ```bash
   git clone https://github.com/hamdanyasser/PPT.git
   cd PPT
   ```

2. **فتح الملف في المتصفح**:
   - افتح ملف `index.html` مباشرة في أي متصفح حديث
   - أو استخدم خادم محلي مثل:
     ```bash
     # باستخدام Python 3
     python -m http.server 8000

     # باستخدام Node.js (npx)
     npx serve
     ```

3. **استمتع بالعرض!** 🎉

## 🌐 نشر المشروع على GitHub Pages

1. **إنشاء مستودع GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Add Arabic infographic: Brain vs Technology"
   ```

2. **ربط المستودع بـ GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/brain-vs-tech.git
   git branch -M main
   git push -u origin main
   ```

3. **تفعيل GitHub Pages**:
   - اذهب إلى Settings → Pages
   - اختر Branch: `main` و Root: `/`
   - احفظ واحصل على رابط موقعك!

## ⚙️ التخصيص والتعديل

### تعديل النصوص
افتح ملف `index.html` وعدّل المحتوى داخل عناصر `<section class="slide">`.

### تعديل الألوان والتصميم
افتح ملف `styles.css` وعدّل:
- الخلفيات (Gradients)
- الألوان الأساسية
- أحجام الخطوط
- الرسوم المتحركة

### تعديل التوقيتات
افتح ملف `script.js` وعدّل المصفوفة:
```javascript
const slideDurations = [3000, 7000, 7000, 7000, 6000];
```
(الأرقام بالميلي ثانية: 1000 = ثانية واحدة)

## 🎮 طرق التحكم

- **⏭ التالي / ⏮ السابق**: أزرار للتنقل بين الشرائح
- **🔁 إعادة التشغيل**: العودة للشريحة الأولى
- **⌨️ لوحة المفاتيح**:
  - `←` / `→`: التنقل بين الشرائح
  - `Home`: العودة للبداية
- **📱 اللمس**: اسحب يمينًا أو يسارًا للتنقل

## 🛠 التقنيات المستخدمة

- HTML5
- CSS3 (Animations & Gradients)
- Vanilla JavaScript (ES6+)
- Google Fonts (Cairo)

## 📋 متطلبات النظام

- متصفح حديث (Chrome, Firefox, Safari, Edge)
- لا يتطلب أي مكتبات خارجية
- يعمل دون اتصال بالإنترنت (بعد التحميل الأول للخط)

## 📄 الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الشخصي والتعليمي.

## 🤝 المساهمة

المساهمات مرحب بها! يمكنك:
- تحسين التصميم
- إضافة شرائح جديدة
- تحسين الرسوم المتحركة
- إصلاح الأخطاء

---

</div>

## 🌍 English Version

### About

An interactive Arabic web infographic comparing the **Human Brain** and **Technology** across multiple dimensions:
- Processing speed
- Creativity and critical thinking
- Learning and adaptation

### Features

- Full Arabic support with RTL layout
- Automatic slideshow with custom timings
- Responsive design for all devices
- Keyboard and touch controls
- Custom CSS animations
- Accessibility support
- Dynamic progress bar

### Quick Start

1. Clone the repository
2. Open `index.html` in a modern browser
3. Enjoy the presentation!

### How to Deploy on GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Select branch `main` and root `/`
4. Your site will be live!

### Technology Stack

- Pure HTML5
- Pure CSS3 with animations
- Vanilla JavaScript (no frameworks)
- Google Fonts (Cairo)

### Controls

- **Next/Previous**: Navigation buttons
- **Restart**: Go back to first slide
- **Keyboard**: Arrow keys and Home
- **Touch**: Swipe left/right

### Customization

- **Text**: Edit `index.html`
- **Design**: Edit `styles.css`
- **Timings**: Edit `script.js`

---

**Made with ❤️ for comparing Human Intelligence and Technology**

<div dir="rtl">

صُنع بـ ❤️ لمقارنة الذكاء البشري والتكنولوجيا

</div>
