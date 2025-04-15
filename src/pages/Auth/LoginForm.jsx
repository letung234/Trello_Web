// TrungQuanDev: https://youtube.com/@trungquandev
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  EMAIL_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()
  let [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const submitLogIn = (data) => {
    const { email, password } = data
    toast.promise(
      dispatch(loginUserAPI({ email, password })),
      { pending: 'Logging in...' }
    ).then(res => {
      if (!res.error) navigate('/')
    })
  }

 return (
  <form onSubmit={handleSubmit(submitLogIn)}>
    <Zoom in={true} style={{ transitionDelay: '200ms' }}>
      <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
        <Box sx={{
          margin: '1em',
          display: 'flex',
          justifyContent: 'center',
          gap: 1
        }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
          <Avatar sx={{ bgcolor: 'primary.main' }}><TrelloIcon /></Avatar>
        </Box>
        <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1em' }}>
          {verifiedEmail &&
            <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              Email của bạn&nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{verifiedEmail}</Typography>
              &nbsp;đã được xác minh.<br />Giờ bạn có thể đăng nhập và sử dụng dịch vụ của chúng tôi. Chúc bạn một ngày tốt lành!
            </Alert>
          }
          {registeredEmail &&
            <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              Một email đã được gửi đến&nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{registeredEmail}</Typography>
              <br />Vui lòng kiểm tra và xác minh tài khoản trước khi đăng nhập!
            </Alert>
          }
        </Box>
        <Box sx={{ padding: '0 1em 1em 1em' }}>
          <Box sx={{ marginTop: '1em' }}>
            <TextField
              autoFocus
              fullWidth
              label="Nhập email..."
              type="text"
              variant="outlined"
              error={!!errors['email']}
              {...register('email', {
                required: 'Vui lòng nhập email!',
                pattern: { value: EMAIL_RULE, message: 'Email không hợp lệ!' }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'email'} />
          </Box>
          <Box sx={{ marginTop: '1em' }}>
            <TextField
              fullWidth
              label="Nhập mật khẩu..."
              type="password"
              variant="outlined"
              error={!!errors['password']}
              {...register('password', {
                required: 'Vui lòng nhập mật khẩu!',
                pattern: { value: PASSWORD_RULE, message: 'Mật khẩu không hợp lệ!' }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'password'} />
          </Box>
        </Box>
        <CardActions sx={{ padding: '0 1em 1em 1em' }}>
          <Button
            className='interceptor-loading'
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Đăng nhập
          </Button>
        </CardActions>
        <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
          <Typography>Bạn mới sử dụng Trello MERN Stack Advanced?</Typography>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
              Tạo tài khoản ngay!
            </Typography>
          </Link>
        </Box>
      </MuiCard>
    </Zoom>
  </form>
)

}

export default LoginForm
