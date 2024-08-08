import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function CustomEditor({ value, fn1, fn, name, id, index }) {
    const editorRef = useRef(null);

    const handleEditorChange = (content) => {
        if (fn) {
            fn(name, content);
        } else if (fn1) {
            fn1(index, name, content);
        }
    };

    return (
        <Editor
            id={id}
            apiKey='czlcpgf0a1nuufk82i4bxjiynbxjislwn6ji27tgbljkk0og'
            onInit={(_evt, editor) => editorRef.current = editor}
            init={{
                width: '100%',
                min_height: 600,
                selector: `textarea#${id}`,
                plugins: 'anchor autolink charmap codesample emoticons image code link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                image_title: true,
                automatic_uploads: true,
                file_picker_types: 'image',
                file_picker_callback: (cb, value, meta) => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    input.addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        if (!file) {
                            return;
                        }
                        const formData = new FormData();
                        formData.append('file', file);

                        fetch('http://localhost:4000/upload', {
                            method: 'POST',
                            body: formData,
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data && data.location) {
                                    const fullUrl = `http://localhost:4000/uploads/${data.location}`;
                                    cb(fullUrl, { title: file.name });
                                } else {
                                    console.error('Upload failed', data);
                                }
                            })
                            .catch(error => {
                                console.error('Error uploading image:', error);
                            });
                    });

                    input.click();
                },
                content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 16px; direction: ltr; }',
            }}
            value={value}
            onEditorChange={handleEditorChange}
        />
    );
}
