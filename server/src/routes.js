import { Router } from 'express';
const router = Router()

router.get('/', (req, res) => {
  console.log('Get request to api/schedule');
  res.send('Get request to api/schedule')
})

export default router