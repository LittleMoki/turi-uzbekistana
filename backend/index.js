import 'dotenv/config';
import express from 'express'
import fs from 'fs'
import multer from 'multer'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import router from "./routes/index.js";
import cors from "cors"

const PORT = process.env.PORT || 4000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))

app.use(router)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir(
            path.join(__dirname, '../frontend/uploads'),
            {recursive: true},
            err => {
                if (err && err.code !== 'EEXIST') {
                    return cb(err)
                }
                cb(null, path.join(__dirname, '../frontend/uploads'))
            }
        )
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})
const upload = multer({storage: storage})

app.post('/upload', upload.single('file'), (req, res) => {
    const {oldPhotoName} = req.body; // Получаем имя старой фотографии
    // Путь к старой фотографии
    if (oldPhotoName) {
        const oldFilePath = path.join('/home/ka4ok/work/turi-uzbekistana.ru/frontend', 'uploads', oldPhotoName);

        // Удаляем старую фотографию, если она существует
        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }
    }

    // Отправляем информацию о новой фотографии
    res.json({location: req.file.originalname});
});

app.post('/uploadmany', upload.array('files'), (req, res) => {
    const fileLocations = req.files.map(file => file.originalname);
    res.json({locations: fileLocations});
});

app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../frontend/uploads', filename);

    fs.access(filepath, fs.constants.F_OK, err => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.sendFile(filepath);
    });
});

app.delete('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../frontend/uploads', filename);

    fs.access(filepath, fs.constants.F_OK, err => {
        if (err) {
            return res.status(404).send('File not found');
        }

        fs.unlink(filepath, err => {
            if (err) {
                return res.status(500).send('Error deleting file');
            }
            res.send('File deleted successfully');
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
