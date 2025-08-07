import multer from 'multer'
import env from 'dotenv'
env.config()

const upload = multer({ dest: 'uploads/' })

export default upload
