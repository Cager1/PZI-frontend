import { extend } from "vee-validate";
import { required, digits, email, max, min, confirmed } from 'vee-validate/dist/rules'
extend('digits', {
  ...digits,
  message: '{_field_} needs to be {len  gth} digits. ({_value_})',
})

extend('min', {
  ...min,
  message: '{_field_} mora imati {length} karaktera.',
})

extend('confirmed', {
  ...confirmed,
  message: 'Šifre moraju biti iste',
})

extend('required', {
  ...required,
  message: 'Ovo polje je obavezno',
})

extend('max', {
  ...max,
  message: 'Polje ne smije biti duze od {length} karaktera',
})
extend('email', {
  ...email,
  message: 'E-mail mora biti validan',
})
