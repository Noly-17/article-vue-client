<template>
  <div class="article-parent-wrapper">
    <div class="minimize-button-wrapper">
      <span class="minimize-button" @click="toggleMinimize">{{
        formTitle
      }}</span>
      <span class="minimize-button" @click="onPublish" v-if="type === 'editor'"
        >PUBLISH</span
      >
    </div>
    <form
      v-if="!isMinimized"
      class="text-editor-form"
      @submit.prevent="handleSubmit"
    >
      <div class="fields">
        <input class="input-field" placeholder="Title" v-model="title" />
        <input class="input-field" placeholder="Link" v-model="link" />
        <select class="dropdown" v-model="role">
          <option value="">Select Company</option>
          <option value="Writer">Writer</option>
          <option value="Editor">Editor</option>
        </select>
        <input type="date" class="input-field" v-model="date" />
        <input type="file" class="upload-btn" @change="onFileChange" />
      </div>
      <div class="text-editor">
        <div ref="quillEditor" class="editor"></div>
      </div>
      <div class="form-footer">
        <div>
          <button type="submit" class="post-btn">{{ btn }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const props = defineProps({
  formTitle: String,
  btn: String,
  onSubmit: Function,
  onPublish: Function,
  type: String,
});

const title = ref('');
const link = ref('');
const role = ref('');
const date = ref('');
const quillEditor = ref(null);
let quill = null;
let selectedFile = null;
const isMinimized = ref(false);

const toggleMinimize = () => (isMinimized.value = !isMinimized.value);

const onFileChange = (event) => {
  selectedFile = event.target.files[0];
};

const handleSubmit = () => {
  const articleContent = quill.root.innerHTML;

  const formData = {
    title: title.value,
    link: link.value,
    role: role.value,
    date: date.value,
    content: articleContent,
  };

  props.onSubmit({ formData, file: selectedFile });
};

onMounted(() => {
  initializeQuill();
});

watch(isMinimized, (newVal) => {
  if (!newVal && quillEditor.value && !quill) {
    initializeQuill();
  }
});

const initializeQuill = () => {
  quill = new Quill(quillEditor.value, {
    theme: 'snow',
    placeholder: 'Start writing your article here...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  });
};
</script>

<style scoped>
.article-parent-wrapper {
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.11);
  transition: transform 0.2s ease-in-out;
}

.text-editor-form {
  padding: 20px;
  position: relative;
}

.fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.input-field {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  transition: border 0.3s ease;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.dropdown {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  transition: border 0.3s ease;
}

.dropdown:focus {
  border-color: #007bff;
  outline: none;
}

.upload-btn {
  padding: 6px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-btn:hover {
  background-color: #218838;
}

.text-editor {
  margin-top: 20px;
}

.editor {
  height: 300px;
  background-color: white;
  overflow-y: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.post-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.post-btn:hover {
  background-color: #0056b3;
}

.minimize-button-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 10px;
  color: #007bff;
  font-weight: bold;
  text-align: right;
  padding: 20px;
  widows: 100%;
}

.minimize-button {
  flex: 1;
  text-align: center;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: none;
}

.minimize-button:hover {
  background-color: rgb(221, 221, 221);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
</style>
