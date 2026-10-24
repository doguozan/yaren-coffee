/** Sayfadaki tüm metin ve listeler: içerik değişince bileşenlere dokunmak gerekmesin diye burada. */
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'

import americanoImage from '../assets/americano.jpg'
import cappuccinoImage from '../assets/cappuccino.jpg'
import espressoImage from '../assets/espresso.png'
import filtreKahveImage from '../assets/filtre-kahve.png'
import flatWhiteImage from '../assets/flat-white.jpg'
import latteImage from '../assets/latte.jpg'
import mochaImage from '../assets/mocha.jpg'
import turkKahvesiImage from '../assets/turk-kahvesi.png'

export const navLinks = [
  { label: 'Kahveler', href: '#kahveler' },
  { label: 'Hikâyemiz', href: '#hikayemiz' },
  { label: 'İletişim', href: '#iletisim' },
]

export const brandValues = [
  {
    title: 'Haftalık taze kavrum',
    body: 'Çekirdekler küçük partiler hâlinde kavrulur, tazeyken demlenir.',
  },
  {
    title: 'Cezve geleneği',
    body: 'Türk kahvesi ağır ateşte pişer, köpüğüyle servis edilir.',
  },
  {
    title: 'Modern demleme',
    body: 'Espresso ve filtrede ölçülü tarif, her fincanda aynı lezzet.',
  },
]

export const products = [
  {
    title: 'Türk Kahvesi',
    price: '₺85',
    description:
      'Cezvede ağır ateşte pişirilen, bol köpüklü klasik. Bir bardak su ve lokumla servis edilir.',
    meta: 'Sade · Orta · Şekerli — 70 ml',
    image: turkKahvesiImage,
    imageAlt: 'Fincanda köpüklü Türk kahvesi',
  },
  {
    title: 'Espresso',
    price: '₺75',
    description:
      'Çikolata ve kavrulmuş fındık notalı harmanımızdan, ipeksi kremasıyla tek ya da duble shot.',
    meta: 'Tek · Duble — 30 ml',
    image: espressoImage,
    imageAlt: 'Cam fincanda kremalı espresso',
  },
  {
    title: 'Filtre Kahve',
    price: '₺90',
    description:
      'Tek kökenli çekirdeklerle elde demlenir; meyvemsi asidite, berrak gövde ve uzun bitiş.',
    meta: 'V60 · Chemex — 250 ml',
    image: filtreKahveImage,
    imageAlt: 'Beyaz fincanda filtre kahve',
  },
  {
    title: 'Americano',
    price: '₺85',
    description:
      'Duble espresso sıcak suyla buluşur; harmanımızın karakterini koruyan sade, uzun bir içim.',
    meta: 'Sıcak · Buzlu — 350 ml',
    image: americanoImage,
    imageAlt: 'Ahşap masada beyaz kupada sade americano',
  },
  {
    title: 'Latte',
    price: '₺100',
    description:
      'Espresso ve ipeksi buharlanmış sütün yumuşak uyumu. İnce köpüğüyle günün her saatine eşlik eder.',
    meta: 'İnek sütü · Yulaf sütü — 350 ml',
    image: latteImage,
    imageAlt: 'Kahverengi fincanda süt sanatlı latte',
  },
  {
    title: 'Cappuccino',
    price: '₺95',
    description:
      'Espresso, sıcak süt ve kadifemsi köpük eşit ölçüde; klasik oranıyla dengeli bir fincan.',
    meta: 'Tek · Duble shot — 240 ml',
    image: cappuccinoImage,
    imageAlt: 'Ahşap masada tabaklı beyaz fincanda cappuccino',
  },
  {
    title: 'Flat White',
    price: '₺105',
    description:
      'Duble ristretto üzerine ince dokulu süt; kahvenin yoğunluğunu öne çıkaran pürüzsüz bir içim.',
    meta: 'Duble ristretto — 180 ml',
    image: flatWhiteImage,
    imageAlt: 'Benekli krem fincanda rozet desenli flat white',
  },
  {
    title: 'Mocha',
    price: '₺110',
    description:
      'Espresso, bitter çikolata ve buharlanmış süt bir arada. Tatlı bir mola için kakao dokunuşu.',
    meta: 'Sıcak · Buzlu — 350 ml',
    image: mochaImage,
    imageAlt: 'Krem şanti ve çikolata parçacıklarıyla mocha',
  },
]

export const storySteps = [
  { number: '01', title: 'Seç.', body: 'Özenle seçilmiş çekirdekler, küçük partiler.' },
  { number: '02', title: 'Demle.', body: 'Cezvede, makinede ya da elde; doğru tarifle.' },
  { number: '03', title: 'Paylaş.', body: 'Bir fincan, bir sohbet, kırk yıllık hatır.' },
]

export const contactInfo = [
  { label: 'Adres', value: '[Adres bilgisi]' },
  { label: 'E-posta', value: '[merhaba@alanadi.com]' },
  { label: 'Saatler', value: '[Hafta içi 08:00 – 22:00]' },
]

export const socials = [
  { label: 'Instagram', href: '#', icon: FaInstagram },
  { label: 'TikTok', href: '#', icon: FaTiktok },
  { label: 'YouTube', href: '#', icon: FaYoutube },
]
