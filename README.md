# العقل البشري VS التكنولوجيا | Human Brain VS Technology

<div dir="rtl">

## 🎬 نبذة عن المشروع

**فيديو إنفوجرافيك تفاعلي** على الويب يقارن بين **العقل البشري** و**التكنولوجيا** في عدة جوانب:
- ⚡ سرعة المعالجة
- 💡 الإبداع والتفكير النقدي
- 🔄 التعلم والتكيف

المشروع مصمم كـ **فيديو تلقائي** (Auto-playing Video) مدته 30 ثانية مع تحكم كامل (تشغيل، إيقاف، إعادة، تقديم).

## ✨ المميزات

- 🎬 **تشغيل تلقائي** مع انتقالات سلسة بين الأقسام
- ⏯️ **أدوات تحكم فيديو**: تشغيل، إيقاف، إعادة، شريط تقدم
- 🎨 تصميم عربي بالكامل مع دعم RTL
- 🎭 رسوم متحركة احترافية لكل عنصر
- ⏱️ مدة الفيديو: 30 ثانية (قابلة للتخصيص)
- 📱 تصميم متجاوب يعمل على جميع الأجهزة
- 🎯 تجربة مشابهة لفيديو YouTube
- 🖼️ قابل للتصدير كفيديو باستخدام أدوات تسجيل الشاشة

## 📂 بنية المشروع

</div>

```
PPT/
├── index.html      # الهيكل الأساسي والمحتوى (HTML)
├── styles.css      # التصاميم والرسوم المتحركة (CSS)
├── video.js        # منطق التحكم بالفيديو (JavaScript)
└── README.md       # هذا الملف
```

<div dir="rtl">

## 🚀 كيفية التشغيل محليًا

### 1. **فتح الملف مباشرة**
افتح ملف `index.html` في أي متصفح حديث (Chrome, Firefox, Safari, Edge) وسيبدأ الفيديو تلقائيًا بعد نصف ثانية.

### 2. **أدوات التحكم**
- **▶️ تشغيل**: لبدء أو استئناف الفيديو
- **⏸️ إيقاف مؤقت**: لإيقاف الفيديو مؤقتًا
- **🔄 إعادة**: للعودة إلى البداية
- **شريط التقدم**: انقر على أي مكان للانتقال إلى ذلك الوقت

### 3. **استخدام خادم محلي (اختياري)**
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

## 🎥 تصدير الفيديو

### الطريقة 1: تسجيل الشاشة المدمج (أسهل طريقة)

**على Windows 10/11:**
1. افتح `index.html` في المتصفح
2. اضغط `Win + G` لفتح Game Bar
3. انقر على زر التسجيل (أو اضغط `Win + Alt + R`)
4. الفيديو سيتم حفظه في مجلد `Videos/Captures`

**على Mac:**
1. افتح `index.html` في المتصفح
2. اضغط `Cmd + Shift + 5`
3. اختر "تسجيل الشاشة المحددة"
4. حدد نافذة المتصفح وابدأ التسجيل

### الطريقة 2: إضافات المتصفح

استخدم إضافات مثل:
- **[Loom](https://www.loom.com/)**: تسجيل عالي الجودة ومشاركة فورية
- **[Screen Recorder](https://chrome.google.com/webstore/category/extensions)**: إضافة Chrome مجانية
- **[Screencastify](https://www.screencastify.com/)**: تسجيل احترافي مع تحرير

### الطريقة 3: أدوات احترافية

للحصول على أفضل جودة:
- **OBS Studio** (مجاني ومفتوح المصدر): [obsproject.com](https://obsproject.com)
- **Camtasia** (مدفوع): للتسجيل والتحرير الاحترافي
- **Bandicam**: لتسجيل عالي الجودة

### نصائح للتسجيل الأمثل:
- ✅ استخدم دقة 1920x1080 (Full HD)
- ✅ أغلق كل البرامج الأخرى لتحسين الأداء
- ✅ سجل مع صوت إذا أردت إضافة تعليق صوتي
- ✅ اضبط وضع السطوع الكامل للشاشة

## 🎨 تخصيص الفيديو

### تعديل مدة الفيديو
افتح ملف `video.js` وعدّل المصفوفة في بداية الملف:
```javascript
const SECTION_DURATIONS = [4000, 6000, 6000, 6000, 8000];
// الأرقام بالميلي ثانية: 1000 = 1 ثانية
// [القسم 1: 4 ثواني، القسم 2: 6 ثواني، القسم 3: 6 ثواني، القسم 4: 6 ثواني، القسم 5: 8 ثواني]
```

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
- **CSS3**: التصاميم والرسوم المتحركة الاحترافية
- **Vanilla JavaScript**: منطق التحكم بالفيديو وتزامن الأحداث
- **Google Fonts (Tajawal)**: خط عربي جميل وواضح
- **لا توجد مكتبات خارجية**: كود نظيف وبسيط

## 📋 متطلبات النظام

- ✅ متصفح حديث (Chrome 60+, Firefox 55+, Safari 11+, Edge 79+)
- ✅ JavaScript مفعّل
- ✅ يعمل دون اتصال بالإنترنت (بعد التحميل الأول للخط)
- ✅ دقة شاشة موصى بها: 1920x1080 أو أعلى

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

## 🤝 حالات الاستخدام

هذا الفيديو التفاعلي مثالي لـ:
- 🎥 **منشورات وسائل التواصل**: Facebook, Instagram, LinkedIn, Twitter
- 📊 **عروض تقديمية**: PowerPoint, Google Slides, Keynote
- 🎬 **فيديوهات YouTube / TikTok**: بعد إضافة موسيقى خلفية
- 📧 **حملات البريد الإلكتروني**: مرفق كفيديو GIF أو MP4
- 🖥️ **مواقع الويب**: تضمين مباشر كصفحة ويب
- 📱 **تطبيقات الهاتف**: عرض داخل WebView
- 🎓 **محتوى تعليمي**: شرح مفاهيم تقنية بطريقة بصرية

---

</div>

## 🌍 English Version

### About

An **interactive animated video infographic** in Arabic comparing **Human Brain** vs **Technology** across 5 dimensions:
- Processing speed ⚡
- Creativity and critical thinking 💡
- Learning and adaptation 🔄

**30-second auto-playing video** with full controls (play, pause, restart, seek).

### Features

- 🎬 **Auto-playing video** with smooth transitions
- ⏯️ **Video controls**: Play, pause, restart, progress bar
- 🎭 Professional animations for every element
- ⏱️ **Duration**: 30 seconds (customizable)
- 📱 Responsive design for all devices
- 🎯 YouTube-like experience
- 🖼️ Export-ready using screen recording tools

### Quick Start

1. Open `index.html` in any modern browser
2. Video starts automatically after 0.5 seconds
3. Use controls to play, pause, or restart
4. Click on progress bar to jump to any section

### Recording Options

**Windows 10/11:**
- Press `Win + G` → Start recording
- Video saved in `Videos/Captures`

**Mac:**
- Press `Cmd + Shift + 5` → Select screen recording
- Choose browser window → Start recording

**Professional Tools:**
- **OBS Studio** (free): Best quality recording
- **Loom**: Quick sharing and collaboration
- **Camtasia**: Professional editing included

### Technology Stack

- **HTML5**: Structure and content
- **CSS3**: Professional animations and styling
- **Vanilla JavaScript**: Video playback control and event synchronization
- **Google Fonts (Tajawal)**: Beautiful Arabic typography
- **No external libraries**: Clean, lightweight code

### Use Cases

Perfect for:
- 🎥 Social media posts (Facebook, Instagram, LinkedIn, Twitter)
- 📊 Presentations (PowerPoint, Google Slides, Keynote)
- 🎬 YouTube / TikTok videos (add background music)
- 📧 Email campaigns (attach as MP4)
- 🖥️ Website embedding
- 🎓 Educational content

### Customization

- **Video duration**: Edit `video.js` → `SECTION_DURATIONS` array
- **Text**: Edit `index.html`
- **Colors**: Edit `styles.css` (gradients and borders)
- **Fonts**: Edit `styles.css` (font sizes)

---

**Made with ❤️ for comparing Human Intelligence and Technology**

<div dir="rtl">

صُنع بـ ❤️ لمقارنة الذكاء البشري والتكنولوجيا

</div>
