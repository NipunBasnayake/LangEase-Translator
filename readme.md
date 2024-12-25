#  **LangEase Translate**  

LangEase Translate is a **modern and interactive** web-based translation application that makes language barriers a thing of the past! 🌟 Effortlessly translate between languages and listen to your text in English with an intuitive and beautifully designed interface. 

---

## ✨ **Features**

1. 🎌 **Language Selection**
   - 🌐 Choose source and target languages dynamically.
   - 🚀 Default language settings: English (en-GB) to Sinhala (si-LK).

2. ⚡ **Instant Translation**
   - ✍️ Input text is translated instantly using the [MyMemory Translated API](https://mymemory.translated.net/).

3. 🔊 **Speech Synthesis**
   - 🎤 Hear your English text with the browser's built-in Speech Synthesis API.

4. ⏳ **Loading Spinner**
   - 🚥 Indicates progress while fetching translations with a stylish spinner.

5. 🖌️ **Responsive UI**
   - ✨ Designed with Bootstrap for a sleek and modern user experience.

---

## ⚙️ **Installation and Setup**

1. 📥 Clone or download the repository.
2. ✅ Ensure all required files are in place:
   - `index.html` (Main HTML file)
   - `app.js` (JavaScript logic)
   - `countries.js` (Contains a list of country codes and names)
   - `style.css` (Custom styles)

3. 🔗 Add the required dependencies:
   - 🌟 Bootstrap CSS and JS (CDN links included in the `index.html` file).
   - 🎨 Bootstrap Icons for UI elements.

4. 🌐 Open `index.html` in any modern browser to get started!

---

## 🛠️ **Usage**

1. 🎯 **Select Languages**
   - 🌍 Use the dropdown menus to choose source and target languages.
2. 📝 **Input Text**
   - 💡 Type or paste text into the input box.
3. 🧙 **Translation**
   - ✨ Translations appear like magic in the output box.
4. 🔉 **Voice Output**
   - 🔊 Click the speaker icon to listen to the English text (if applicable).

---

## 📂 **Files and Structure**

```plaintext
├── index.html      # Main HTML file
├── css/
│   └── style.css   # Custom styles
├── app.js          # JavaScript logic
├── countries.js    # Country codes and names
```

---

## 🌐 **API Details**

- **Translation API:** [MyMemory Translated API](https://mymemory.translated.net/)
  - API Endpoint: `https://api.mymemory.translated.net/get`
  - Parameters:
    - `q`: Text to translate
    - `langpair`: Language pair in the format `source|target` (e.g., `en-GB|si-LK`).

---

## 🌟 **Browser Compatibility**

- 🖥️ Works best on modern browsers supporting:
  - `fetch` API
  - `SpeechSynthesis` API

---

## 🚀 **Future Enhancements**

1. 🔒 Add support for more advanced APIs with authentication.
2. 🌍 Improve speech synthesis for multiple languages.
3. 🛡️ Implement offline translation support.

---

## 📜 **License**

This project is licensed under the **MIT License**. Feel free to explore, use, and enhance it! 💡

---
