'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Error from '@/components/Error'
import { services } from '@/db'
import Tag from '@/components/Tag'
import Footer from '@/components/Footer'
import TextMaquina from '@/components/TextMaquina'
import { useRouter } from 'next/navigation';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import priceFTL from '@/db/FTL.json'
import 'react-awesome-slider/dist/styles.css';
import InputEspecial from '@/components/InputEspecial'
import QRscanner from '@/components/QRscanner'
import { QRreaderUtils } from '@/utils/QRreader'
import InputFlotante from '@/components/InputFlotante'
import { generateUUID } from '@/utils/UIDgenerator'
import SelectSimple from '@/components/SelectSimple'



function Componente({ title, image, paragraph }) {
  return <div className='relative bg-[#ffffffcb] my-5 flex  lg:max-w-[500px] lg:min-w-[250px] lg:min-h-[250px] lg:text-[18px] lg:mx-5 lg:flex lg:flex-col lg:justify-center lg:items-center rounded-[15px] '>
    <img src={image} className=" w-[150px] lg:max-w-[200px] object-contain p-5" alt="" />
    <div className="w-full bg-gradient-to-t from-[#00195cbe] via-[#00195cbe] to-[#00195c]  p-5 py-5 rounded-r-[15px] lg:rounded-t-[0]  lg:rounded-b-[15px]">
      <h4 className="w-full text-left font-medium border-b-[3px] text-white pb-5 pl-0 ml-0 border-[#ffffff] p-5">{title}</h4>
      <p className="text-white " >
        {paragraph}
      </p>
      <div className="relative flex justify-end w-[100%]">
        <button className="inline-block bg-[#ffb834] px-3 text-[12px] border text-center font-medium py-2 m-1  
         cursor-pointer rounded-[5px]">Saber mas</button>
      </div>
    </div>
  </div>
}
function Item({ e1, e2 }) {
  return <ScrollAnimation animateIn='flipInX'
    afterAnimatedIn={function afterAnimatedIn(v) {
      var t = "Animate In finished.\n";
      t += 'v.onScreen: ' + v.onScreen + '\n';
      t += 'v.inViewport: ' + v.inViewport;

    }}
    initiallyVisible={true}>
    <div className='flex flex-col justify-center items-center'>
      <span className='text-[30px] font-medium'>{e1}</span>
      <span className='text-center'>{e2}</span>
    </div>
  </ScrollAnimation>
}

function Section({ subtitle, description, video, gradiente, id, children, tarjetas, miniTarjetas }) {

  const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, nav, cliente, setCliente, focus, setFocus } = useUser()



  return <section className='relative w-full  bg-gradient-to-tr from-[#00195c] via-[#274492] to-[#00195c] overflow-x-hidden overflow-hidden' id={id}>
    <div className='relative px-5 py-12 w-full min-h-[50vh] flex flex-col z-30 lg:grid lg:grid-cols-2 justify-around items-center  from-[#00195cdc] via-[#00195cb6] to-[#00195cdc] '>
      <div>
        <Subtitle><h3 className='text-[30px] text-[white] text-center font-medium  py-10'>{subtitle}</h3></Subtitle>
        <ScrollAnimation animateIn='bounceInLeft'
          animateOut='bounceOutLeft'
          initiallyVisible={true}
        >
          <p className=' text-[16px] text-[white] pb-5' dangerouslySetInnerHTML={{ __html: description }}>
          </p>
          <div className='flex justify-end '>
            <button type="button" className="w-full border-[2px] md:max-w-[300px] text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-[12px] px-5 py-2.5 text-center inline-flex items-center ">
              Orden de servicio
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
        </ScrollAnimation>
      </div>
      <div className='w-full text-[white] grid grid-cols-2 gap-5 py-12'>
        {cliente && cliente[id] && cliente[id].miniTarjetas && Object.values(cliente[id].miniTarjetas).map((i, index) => <Item e1={i[`ip`]} e2={i[`ic`]} />)}
      </div>

    </div>

    {/* ---------------------------------------------Tarjetas---------------------------------------- */}
    <div className='relative min-h-screen  w-full flex flex-col justify-top lg:flex-wrap  lg:flex-row lg:justify-center lg:items-center  z-20  '>

      <video className='absolute bottom-0  w-full h-full min-h-[100vh] object-cover z-10' autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className='absolute top-0  w-full min-h-[100vh] h-full object-cover z-20 bg-gradient-to-tr from-[#00195c]  via-[#cfbd7546] to-[#00195c]    lg:bg-gradient-to-tr lg:from-[#00195cd7]  lg:via-[#cfbd7546] lg:to-[#00195c] '></div>

      {cliente && cliente[id] && cliente[id].tarjetas && Object.values(cliente[id].tarjetas).map((i, index) => {
        return <div className='inline px-5 z-50' key={index}>
          <Componente title={i.title} image={i.url} paragraph={i.paragraph} />
        </div>
      })}
    </div>

  </section>

}




export default function Home() {
  const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, nav, cliente, setCliente, focus, setFocus, seeMore, setSeeMore } = useUser()

  const [element, setElement] = useState('TRACKING')
  const [calcValue, setCalcValue] = useState('NO DATA')
  const [selectValue, setSelectValue] = useState({})
  const [code, setCode] = useState('')

  const router = useRouter()
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const inputRef = useRef('')
  const inputRef2 = useRef('')


  const redirectHandlerWindow = (ref) => {
    window.open(ref, '_blank')
  }

  function HandlerOnChange(e) {
    QRreaderUtils(e, setFilterQR,)
  }

  // let data = priceFTL.reduce((acc, i, index) => {
  //   return acc.includes(i.ORIGEN) ? acc : [...acc, i.ORIGEN]
  // }, [])

  async function HandlerCheckOut(e) {

    //  const data =  Object.entries(calcValue).map((i, index) => `${i[0]}: ${i[1]}`)
    router.push('Solicitud')
    return

    const db = Object.entries(calcValue).reverse().reduce((acc, i, index) => {
      const data = `${i[0]}: ${i[1]}\n`
      return data + '\r\n' + acc
    }, ``)

    var whatsappMessage = "SOLICITUD DE SERVICIO" + "\r\n\r\n" + db
    whatsappMessage = window.encodeURIComponent(whatsappMessage)
    console.log(whatsappMessage)
    // window.open(`https://api.whatsapp.com/send?phone=${perfil.whatsapp.replaceAll(' ', '')}&text=${whatsappMessage}`, '_blank')
    window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=${whatsappMessage}`, '_blank')

  }
  async function HandlerCheckOut2(e) {
    const db = Object.entries({ ORIGEN: inputRef.current.value, DESTINO: inputRef2.current.value, ...selectValue }).reverse().reduce((acc, i, index) => {
      const data = `${i[0]}: ${i[1]}\n`
      return data + '\r\n' + acc
    }, ``)

    var whatsappMessage = "SOLICITUD DE SERVICIO" + "\r\n\r\n" + db
    whatsappMessage = window.encodeURIComponent(whatsappMessage)
    console.log(whatsappMessage)
    // window.open(`https://api.whatsapp.com/send?phone=${perfil.whatsapp.replaceAll(' ', '')}&text=${whatsappMessage}`, '_blank')
    window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=${whatsappMessage}`, '_blank')

  }

  function handlerOnChange(e) {
    e.stopPropagation();
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value })

  }

  function reset() {
    setFocus('')
  }

  function handlerSelect(i) {
    inputRef.current.value = i
    inputRef2.current.value = ''

    setFocus('')
  }
  function handlerSelect2(i) {
    inputRef2.current.value = i
    setFocus('')
  }


  function handlerClickSelect(name, i, uuid) {
    let db = { [name]: i }
    setSelectValue({ ...selectValue, ...db })
  }


  function write() {

    // Object.keys(userDB.priceFTL).map((i, index) => {
    //   return writeUserData(`Cliente/priceFTL/${i}`, i)
    // }, {})
    writeUserData('Cliente/priceFTL', priceFTL)
  }

  // console.log(Object.values(cliente.priceFTL).find((i) => {
  //   console.log(i.ORIGEN === 'ARICA, CL')
  //   // console.log(inputRef.current.value + i.ORIGEN)
  //   // console.log(inputRef2.current.value + i.DESTINO)
  //   return i.ORIGEN === 'ARICA, CL'
  // }))
  function calculator(e) {
    e.preventDefault()

    console.log(selectValue)
    console.log(inputRef.current.value)
    console.log(inputRef2.current.value)
    let val = Object.values(cliente.priceFTL).find((i) => {
      return i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value && i.MERCANCIA === selectValue.MERCANCIA && i['PESO (KG)'] >= selectValue['PESO (KG)'] && i.SERVICIO === selectValue.SERVICIO && i['TIPO DE UNIDAD'] === selectValue['TIPO DE UNIDAD'] && i['VOLUMEN M3'] >= selectValue['VOLUMEN M3']
    })
    val !== undefined ? setCalcValue(val) : setUserSuccess('NO DATA')
  }

  function handlerSeeMore(key) {
    seeMore === key ? setSeeMore('') : setSeeMore(key)
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  function onChangeHandler(e) {
    setCode(e.target.value)

  }
  function filterTracking(e) {
    e.preventDefault()
    router.push(`/Tracking?item=${code}`)

  }

  console.log(cliente)
  console.log(userDB)
  console.log(user)


  return (
    <main className={`relative h-screen w-screen `} onClick={reset} id='inicio'>
      <section className='relative '>
        <video className='fixed bottom-0 w-full h-[100vh] pb-[10px] object-cover object-bottom ' autoPlay loop muted>
          <source src={"/container(720p).mp4"} type="video/mp4" />
        </video>
        <div className='absolute top-0  w-full min-h-[100vh] h-full object-cover z-10 bg-gradient-to-tr from-[#00195c]  via-[#cfbd7546] to-[#00195c]    lg:bg-gradient-to-tr lg:from-[#00195cd7]  lg:via-[#cfbd7546] lg:to-[#00195c] '></div>
        <div className='relative min-h-[100vh] h-full py-[50px] w-full lg:pt-10 pb-0 flex flex-col justify-around lg:flex-row items-center  z-20' style={{ background: '-gradient(to bottom, #000000,  #000000c7, #00000050' }}>
          <img src='/logo-comp.gif' className=' relative  inline-block w-[80vw] h-[80vw]    lg:w-[30vw] lg:h-[60vh]  object-cover object-center ' />
          <div className='lg:scale-110 w-full lg:w-[40%] lg:bg-[#111a33d0] p-5'>
            <div className='   font-bold'>
              <TextMaquina />
            </div>
            <br />
            <div className='grid grid-cols-2 gap-2 w-full '>
              {/* <button onClick={write}>Click</button> */}
              <button type="button" onClick={() => router.push('/Glosario')} className="w-full border-[2px]   text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-[12px] px-5 py-2.5 text-center inline-flex items-center ">
                Glosarios
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
              <button type="button" onClick={() => redirectHandlerWindow(`https://api.whatsapp.com/send?phone=+59176586948&text=hola%20Logistics%20Gear`)} className="w-full  border-[2px]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] px-5 py-2.5 text-center inline-flex items-center ">
                Contactar
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
            </div>
            <br />
            <div className='bg-[#ffffff] p-5'>
              {calcValue === 'NO DATA'
                ? <ul className="flex border-b border-[blue] ">
                  <li className={`-mb-px mr-1 ${element === 'TRACKING' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setElement('TRACKING')}>
                    <a className=" inline-block rounded-t py-2 px-2 text-blue-700 font-semibold" href="#">Tracking</a>
                  </li>
                  <li className={`-mb-px mr-1 ${element === 'FCL' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setElement('FCL')}>
                    <a className=" inline-block rounded-t py-2 px-2 text-blue-500 font-semibold" href="#">Cotizador FCL</a>
                  </li>
                  <li className={`-mb-px mr-1 ${element === 'FTL' && 'bg-[#F7BE38] border border-[blue] border-b-transparent'}`} onClick={() => setElement('FTL')}>
                    <a className=" inline-block rounded-t py-2 px-2 text-blue-500  font-semibold" href="#">Cotizador FTL</a>
                  </li>
                </ul>
                : <div className='w-full text-center bg-blue-700 text-white p-2'>  COTIZACIÓN {element}  </div>
              }
              {element === 'TRACKING' && <form className="max-w-md w-full flex  mx-auto pt-5">
                <div className="flex w-full ">
                  <label htmlFor="location-search" className="mb-2 text-[12px] font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                  <div className="relative w-full">
                    <input type="search" id="location-search" className="block p-3 w-full h-full z-20 text-[12px] text-gray-900 border shadow-xl  rounded-[5px] focus:ring-blue-500 focus:border-blue-500" onChange={onChangeHandler} placeholder="Codigo de tracking" required />
                    <button type="button" onClick={filterTracking} className="absolute top-0 end-0 h-full p-2.5 text-[12px] font-medium text-white bg-blue-700 rounded-r-[5px] border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </div>
                </div>
                <label htmlFor="qr" className='bg-[#F7BE38] border-[2px] border-[#0000002d] p-2 rounded-[5px]'>
                  <svg width="20" height="20" viewBox="0 0 323 323" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M138.71 0.669922H12.4399C9.25734 0.669922 6.20509 1.93419 3.95465 4.18463C1.70421 6.43507 0.439941 9.48732 0.439941 12.6699V138.93C0.439941 142.112 1.70421 145.165 3.95465 147.415C6.20509 149.666 9.25734 150.93 12.4399 150.93H138.71C141.893 150.93 144.945 149.666 147.195 147.415C149.446 145.165 150.71 142.112 150.71 138.93V12.6699C150.71 9.48732 149.446 6.43507 147.195 4.18463C144.945 1.93419 141.893 0.669922 138.71 0.669922ZM129.24 43.5999V129.47H21.9099V22.1299H129.24V43.5999Z" fill="black" />
                    <path d="M95.7799 43.6001H55.3799C52.1973 43.6001 49.145 44.8644 46.8946 47.1148C44.6442 49.3652 43.3799 52.4175 43.3799 55.6001V96.0001C43.3799 99.1827 44.6442 102.235 46.8946 104.485C49.145 106.736 52.1973 108 55.3799 108H95.7799C98.9625 108 102.015 106.736 104.265 104.485C106.516 102.235 107.78 99.1827 107.78 96.0001V55.6001C107.78 52.4175 106.516 49.3652 104.265 47.1148C102.015 44.8644 98.9625 43.6001 95.7799 43.6001Z" fill="black" />
                    <path d="M267.51 43.6001H227.11C223.927 43.6001 220.875 44.8644 218.625 47.1148C216.374 49.3652 215.11 52.4175 215.11 55.6001V96.0001C215.11 99.1827 216.374 102.235 218.625 104.485C220.875 106.736 223.927 108 227.11 108H267.51C270.692 108 273.745 106.736 275.995 104.485C278.246 102.235 279.51 99.1827 279.51 96.0001V55.6001C279.51 52.4175 278.246 49.3652 275.995 47.1148C273.745 44.8644 270.692 43.6001 267.51 43.6001Z" fill="black" />
                    <path d="M310.44 0.669922H184.18C180.997 0.669922 177.945 1.93419 175.694 4.18463C173.444 6.43507 172.18 9.48732 172.18 12.6699V138.93C172.18 142.112 173.444 145.165 175.694 147.415C177.945 149.666 180.997 150.93 184.18 150.93H310.44C313.622 150.93 316.675 149.666 318.925 147.415C321.175 145.165 322.44 142.112 322.44 138.93V12.6699C322.44 9.48732 321.175 6.43507 318.925 4.18463C316.675 1.93419 313.622 0.669922 310.44 0.669922ZM301 43.5999V129.47H193.64V22.1299H301V43.5999Z" fill="black" />
                    <path d="M178 215.33H193.61V231C193.613 232.552 194.231 234.04 195.33 235.137C196.428 236.234 197.917 236.85 199.47 236.85H209.23C209.998 236.85 210.759 236.699 211.469 236.405C212.178 236.111 212.823 235.68 213.366 235.136C213.91 234.593 214.341 233.948 214.635 233.239C214.929 232.529 215.08 231.768 215.08 231V215.33H230.69C231.459 215.331 232.221 215.181 232.932 214.887C233.643 214.594 234.289 214.163 234.833 213.62C235.377 213.077 235.809 212.431 236.104 211.721C236.398 211.011 236.55 210.249 236.55 209.48V199.72C236.55 198.951 236.398 198.189 236.104 197.479C235.809 196.769 235.377 196.123 234.833 195.58C234.289 195.036 233.643 194.606 232.932 194.312C232.221 194.019 231.459 193.869 230.69 193.87H215.11V178.25C215.11 176.698 214.494 175.21 213.396 174.113C212.299 173.016 210.811 172.4 209.26 172.4H178C176.448 172.4 174.96 173.016 173.863 174.113C172.766 175.21 172.15 176.698 172.15 178.25V209.48C172.15 211.031 172.766 212.519 173.863 213.616C174.96 214.714 176.448 215.33 178 215.33Z" fill="black" />
                    <path d="M252.2 215.33H242.43C239.199 215.33 236.58 217.949 236.58 221.18V230.95C236.58 234.181 239.199 236.8 242.43 236.8H252.2C255.431 236.8 258.05 234.181 258.05 230.95V221.18C258.05 217.949 255.431 215.33 252.2 215.33Z" fill="black" />
                    <path d="M295.13 215.33H285.36C282.129 215.33 279.51 217.949 279.51 221.18V230.95C279.51 234.181 282.129 236.8 285.36 236.8H295.13C298.361 236.8 300.98 234.181 300.98 230.95V221.18C300.98 217.949 298.361 215.33 295.13 215.33Z" fill="black" />
                    <path d="M316.6 236.8H306.83C303.599 236.8 300.98 239.419 300.98 242.65V252.42C300.98 255.651 303.599 258.27 306.83 258.27H316.6C319.831 258.27 322.45 255.651 322.45 252.42V242.65C322.45 239.419 319.831 236.8 316.6 236.8Z" fill="black" />
                    <path d="M316.59 172.4H263.9C262.348 172.4 260.859 173.016 259.76 174.113C258.661 175.21 258.043 176.697 258.04 178.25V209.48C258.043 211.032 258.661 212.52 259.76 213.617C260.859 214.714 262.348 215.33 263.9 215.33H273.66C275.212 215.33 276.7 214.714 277.797 213.616C278.894 212.519 279.51 211.031 279.51 209.48V193.87H316.59C317.359 193.87 318.121 193.718 318.831 193.424C319.541 193.129 320.187 192.697 320.73 192.153C321.273 191.609 321.704 190.963 321.998 190.252C322.291 189.541 322.441 188.779 322.44 188.01V178.25C322.44 176.698 321.824 175.21 320.727 174.113C319.63 173.016 318.142 172.4 316.59 172.4Z" fill="black" />
                    <path d="M215.11 285.59C215.111 284.821 214.961 284.059 214.667 283.348C214.374 282.637 213.943 281.991 213.4 281.447C212.857 280.902 212.211 280.471 211.501 280.176C210.791 279.881 210.029 279.73 209.26 279.73H193.64V242.65C193.64 241.098 193.024 239.61 191.926 238.513C190.829 237.416 189.341 236.8 187.79 236.8H178C176.448 236.8 174.96 237.416 173.863 238.513C172.766 239.61 172.15 241.098 172.15 242.65V316.81C172.149 317.579 172.299 318.341 172.592 319.052C172.886 319.762 173.316 320.409 173.86 320.953C174.403 321.497 175.049 321.929 175.759 322.224C176.469 322.518 177.231 322.67 178 322.67H187.76C188.529 322.67 189.291 322.518 190.001 322.224C190.711 321.929 191.357 321.497 191.9 320.953C192.443 320.409 192.874 319.762 193.167 319.052C193.461 318.341 193.611 317.579 193.61 316.81V301.2H209.23C210.781 301.2 212.269 300.583 213.366 299.486C214.464 298.389 215.08 296.901 215.08 295.35L215.11 285.59Z" fill="black" />
                    <path d="M316.59 279.73H301V264.12C301 263.351 300.848 262.589 300.554 261.879C300.259 261.169 299.827 260.523 299.283 259.98C298.739 259.437 298.093 259.006 297.382 258.712C296.671 258.419 295.909 258.269 295.14 258.27H285.39C284.621 258.269 283.859 258.419 283.148 258.712C282.437 259.006 281.791 259.437 281.247 259.98C280.703 260.523 280.271 261.169 279.976 261.879C279.682 262.589 279.53 263.351 279.53 264.12V279.73H258V264.12C258 262.568 257.384 261.08 256.287 259.983C255.19 258.886 253.702 258.27 252.15 258.27H221C220.231 258.269 219.469 258.419 218.758 258.712C218.047 259.006 217.401 259.437 216.857 259.98C216.313 260.523 215.881 261.169 215.586 261.879C215.292 262.589 215.14 263.351 215.14 264.12V273.88C215.14 274.649 215.292 275.411 215.586 276.121C215.881 276.831 216.313 277.477 216.857 278.02C217.401 278.564 218.047 278.994 218.758 279.288C219.469 279.581 220.231 279.731 221 279.73H236.61V295.35C236.61 296.901 237.226 298.389 238.324 299.487C239.421 300.584 240.909 301.2 242.46 301.2H258V316.81C258 318.364 258.617 319.855 259.716 320.954C260.815 322.053 262.306 322.67 263.86 322.67H273.62C274.389 322.67 275.151 322.518 275.861 322.224C276.572 321.929 277.217 321.497 277.76 320.953C278.304 320.409 278.734 319.763 279.028 319.052C279.321 318.341 279.471 317.579 279.47 316.81V301.2H301V316.81C300.999 317.579 301.149 318.341 301.443 319.052C301.736 319.763 302.167 320.409 302.71 320.953C303.253 321.497 303.899 321.929 304.609 322.224C305.32 322.518 306.081 322.67 306.85 322.67H316.61C317.379 322.67 318.141 322.518 318.851 322.224C319.562 321.929 320.207 321.497 320.75 320.953C321.294 320.409 321.724 319.763 322.018 319.052C322.311 318.341 322.461 317.579 322.46 316.81V285.59C322.461 284.819 322.31 284.056 322.016 283.344C321.721 282.631 321.289 281.984 320.743 281.44C320.198 280.895 319.55 280.464 318.837 280.17C318.125 279.877 317.361 279.727 316.59 279.73Z" fill="black" />
                    <path d="M230.73 301.2H220.96C217.729 301.2 215.11 303.819 215.11 307.05V316.82C215.11 320.051 217.729 322.67 220.96 322.67H230.73C233.961 322.67 236.58 320.051 236.58 316.82V307.05C236.58 303.819 233.961 301.2 230.73 301.2Z" fill="black" />
                    <path d="M95.7799 215.33H55.3799C52.1973 215.33 49.145 216.594 46.8946 218.845C44.6442 221.095 43.3799 224.147 43.3799 227.33V267.73C43.3799 270.913 44.6442 273.965 46.8946 276.215C49.145 278.466 52.1973 279.73 55.3799 279.73H95.7799C98.9625 279.73 102.015 278.466 104.265 276.215C106.516 273.965 107.78 270.913 107.78 267.73V227.33C107.78 224.147 106.516 221.095 104.265 218.845C102.015 216.594 98.9625 215.33 95.7799 215.33Z" fill="black" />
                    <path d="M138.71 172.4H12.4399C9.25734 172.4 6.20509 173.664 3.95465 175.915C1.70421 178.165 0.439941 181.217 0.439941 184.4V310.67C0.439941 313.852 1.70421 316.905 3.95465 319.155C6.20509 321.406 9.25734 322.67 12.4399 322.67H138.71C141.893 322.67 144.945 321.406 147.195 319.155C149.446 316.905 150.71 313.852 150.71 310.67V184.4C150.71 181.217 149.446 178.165 147.195 175.915C144.945 173.664 141.893 172.4 138.71 172.4ZM129.24 215.33V301.2H21.9099V193.87H129.24V215.33Z" fill="black" />
                  </svg>
                </label>
                <input id="qr" type="file" className='hidden' onChange={HandlerOnChange} accept="image/* " />
              </form>}
              {element === 'FCL' && calcValue === 'NO DATA' &&
                <form className="space-y-5 lg:space-y-0 py-5 lg:grid lg:grid-cols-2 lg:gap-5" onSubmit={calculator}>
                  <InputEspecial type='text' data={Object.values(cliente.priceFTL)} node={'Origen'} focusTxt='ORIGEN-FTL' id='floating_1' inputRef={inputRef} select={handlerSelect}></InputEspecial>
                  <InputEspecial type='text' data={inputRef.current ? Object.values(cliente.priceFTL).filter((i) => i.ORIGEN === inputRef.current.value) : Object.values(cliente.priceFTL)} node={'Destino'} focusTxt='DESTINO-FTL' id='floating_2' inputRef={inputRef2} select={handlerSelect2} style={{ textTransform: 'uppercase' }}></InputEspecial>
                  <InputFlotante type="number" name={'PESO (KG)'} id="floating_4" onChange={handlerOnChange} defaultValue={selectValue['PESO (KG)']} required label={'Peso (KG)'} />
                  <InputFlotante type="number" name={'VOLUMEN M3'} id="floating_5" onChange={handlerOnChange} defaultValue={selectValue['VOLUMEN']} required label={'Volumen M3'} />
                  <SelectSimple arr={inputRef.current ? Object.values(cliente.priceFTL).filter((i) => i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value).map((i) => i['TIPO DE UNIDAD']).filter(onlyUnique) : []} name='TIPO DE UNIDAD' click={handlerClickSelect} defaultValue={selectValue['TIPO DE UNIDAD'] ? selectValue['TIPO DE UNIDAD'] : 'Seleccionar'} uuid='8768798' label='Tipo de unidad'></SelectSimple>
                  <SelectSimple arr={inputRef.current ? Object.values(cliente.priceFTL).filter((i) => i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value).map((i) => i.MERCANCIA).filter(onlyUnique) : []} name='MERCANCIA' click={handlerClickSelect} defaultValue={selectValue['MERCANCIA'] ? selectValue['MERCANCIA'] : 'Seleccionar'} uuid='8768798' label='Mercancia'></SelectSimple>
                  <SelectSimple arr={inputRef.current ? Object.values(cliente.priceFTL).filter((i) => i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value).map((i) => i['SERVICIO']).filter(onlyUnique) : []} name='SERVICIO' click={handlerClickSelect} defaultValue={selectValue['SERVICIO'] ? selectValue['SERVICIO'] : 'Seleccionar'} uuid='8768798' label='Servicio'></SelectSimple>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] w-full  px-5 py-2.5 text-center  mt-7 lg:col-span-2">Continuar</button>
                </form>}
              {element === 'FTL' && calcValue === 'NO DATA' &&
                <form className="space-y-5 lg:space-y-0  py-5 lg:grid lg:grid-cols-2 lg:gap-5" onSubmit={calculator}>
                  <InputEspecial type='text' data={Object.values(cliente.priceFTL)} node={'Origen'} focusTxt='ORIGEN-FTL' id='floating_1' inputRef={inputRef} select={handlerSelect}></InputEspecial>
                  <InputEspecial type='text' data={inputRef.current ? Object.values(cliente.priceFTL).filter((i) => i.ORIGEN === inputRef.current.value) : Object.values(cliente.priceFTL)} node={'Destino'} focusTxt='DESTINO-FTL' id='floating_2' inputRef={inputRef2} select={handlerSelect2} style={{ textTransform: 'uppercase' }}></InputEspecial>
                  <InputFlotante type="number" name={'PESO (KG)'} id="floating_4" onChange={handlerOnChange} defaultValue={selectValue['PESO (KG)']} required label={'Peso (KG)'} />
                  <InputFlotante type="number" name={'VOLUMEN M3'} id="floating_5" onChange={handlerOnChange} defaultValue={selectValue['VOLUMEN']} required label={'Volumen M3'} />
                  <SelectSimple arr={inputRef.current ? Object.values(cliente.priceFTL).filter((i) => i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value).map((i) => i['TIPO DE UNIDAD']).filter(onlyUnique) : []} name='TIPO DE UNIDAD' click={handlerClickSelect} defaultValue={selectValue['TIPO DE UNIDAD'] ? selectValue['TIPO DE UNIDAD'] : 'Seleccionar'} uuid='8768798' label='Tipo de unidad' required={true}></SelectSimple>
                  <SelectSimple arr={inputRef.current ? Object.values(cliente.priceFTL).filter((i) => i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value).map((i) => i.MERCANCIA).filter(onlyUnique) : []} name='MERCANCIA' click={handlerClickSelect} defaultValue={selectValue['MERCANCIA'] ? selectValue['MERCANCIA'] : 'Seleccionar'} uuid='8768798' label='Mercancia' required={true}></SelectSimple>
                  <SelectSimple arr={inputRef.current ? Object.values(cliente.priceFTL).filter((i) => i.ORIGEN === inputRef.current.value && i.DESTINO === inputRef2.current.value).map((i) => i['SERVICIO']).filter(onlyUnique) : []} name='SERVICIO' click={handlerClickSelect} defaultValue={selectValue['SERVICIO'] ? selectValue['SERVICIO'] : 'Seleccionar'} uuid='8768798' label='Servicio' required={true}></SelectSimple>
                  {selectValue['VOLUMEN M3'] <= 43 && selectValue['PESO (KG)'] <= 25000
                    ? <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] w-full  px-5 py-2.5 text-center  mt-7 lg:col-span-2">Cotizar</button>
                    : <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] w-full  px-5 py-2.5 text-center  mt-7 lg:col-span-2          text-white bg-green-500 hover:bg-green-500     " onClick={HandlerCheckOut2}>Solicitar Cotizacion</button>

                  }
                </form>
              }
              {calcValue !== 'NO DATA' &&
                <div className=" pt-5 " >
                  {Object.entries(calcValue).map((i, index) => <div className='flex w-full'><span className='w-full  border px-3 py-1'>{i[0]}</span><span className='w-full border px-3 py-1'>{i[1]}</span></div>)}

                  <div className='relative  w-full grid grid-cols-2 gap-x-5 mt-5'>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px]  px-5 py-2.5 text-center" onClick={() => setCalcValue('NO DATA')}>Volver a calcular</button>
                    <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px]  px-5 py-2.5 text-center" onClick={HandlerCheckOut}>Solicitar Servicio</button>
                  </div>
                </div>
              }
            </div>
            <a href="tel:76586948">
              <marquee className="text-white py-5" behavior="" direction="">Llamanos ya clickea aqui      <button className='border px-5 ml-5  rounded-full bg-[#00000070]' >(+591) 76586948</button> </marquee>
            </a>
          </div>
        </div>
      </section>

      <section className='relative w-full z-1000 overflow-x-hidden' id="Servicios">

        <div className='relative px-5 py-12 w-full flex flex-col  lg:grid lg:grid-cols-2 justify-around items-center   bg-gradient-to-t from-[#00195cdc] via-[#00195cb6] to-[#00195cdc] ' id='Nosotros'>
          <div>

            <Subtitle><h3 className='text-[30px] text-[white] text-center font-medium  py-5'>Nosotros</h3></Subtitle>
            <ScrollAnimation animateIn='bounceInRight'
              animateOut='bounceOutLeft'
              initiallyVisible={true}
            >
              <p className=' text-[16px] text-[white]'>
                Somos una empresa de logística y transporte fundada en Bolivia en 2017 bajo la razón social Engranaje de la Logística Ltda. Desde nuestros inicios, nos hemos dedicado a brindar soluciones integrales de logística, especializándonos en el transporte de cargas de grandes volúmenes, pesadas y sobredimensionadas. Ahora, estamos expandiendo nuestro enfoque para incluir el crecimiento de las exportaciones de Bolivia y el manejo especializado de productos farmacéuticos.
                Nuestro objetivo es ofrecer servicios de logística de alta calidad que respondan a las necesidades cambiantes de nuestros clientes. A través de nuestra experiencia y red global de agentes, facilitamos la exportación de productos bolivianos a mercados internacionales, asegurando que lleguen a sus destinos de manera eficiente y segura.
                Además, entendemos la complejidad y los requisitos especiales del sector farmacéutico. Por ello, hemos desarrollado soluciones especializadas para el transporte y manejo de productos farmacéuticos, garantizando el control de temperatura y el cumplimiento de todas las normativas necesarias para mantener la integridad de estos productos esenciales.
              </p>
            </ScrollAnimation>

          </div>
          <div className='w-full text-[white] grid grid-cols-2 gap-5 py-12'>
            <ScrollAnimation animateIn='flipInX'
              afterAnimatedIn={function afterAnimatedIn(v) {
                var t = "Animate In finished.\n";
                t += 'v.onScreen: ' + v.onScreen + '\n';
                t += 'v.inViewport: ' + v.inViewport;

              }}
              initiallyVisible={true}>
              <div className='flex flex-col justify-center items-center'>
                <span className='text-[30px] font-medium'>2017</span>
                <span className='text-center'>AÑO DE FUNDACIÓN</span>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn='flipInX'
              afterAnimatedIn={function afterAnimatedIn(v) {
                var t = "Animate In finished.\n";
                t += 'v.onScreen: ' + v.onScreen + '\n';
                t += 'v.inViewport: ' + v.inViewport;

              }}
              initiallyVisible={true}>
              <div className='flex flex-col justify-center items-center'>
                <span className='text-[25px] font-medium'>La paz, Bolivia</span>
                <span className='text-center'>SEDE MUNDIAL</span>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn='flipInX'
              afterAnimatedIn={function afterAnimatedIn(v) {
                var t = "Animate In finished.\n";
                t += 'v.onScreen: ' + v.onScreen + '\n';
                t += 'v.inViewport: ' + v.inViewport;

              }}>
              <div className='flex flex-col justify-center items-center'>
                <span className='text-[30px] font-medium'>100 000 $</span>
                <span className='text-center'>FACTURACIÓN EN DOLARES EN 2023</span>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn='flipInX'
              afterAnimatedIn={function afterAnimatedIn(v) {
                var t = "Animate In finished.\n";
                t += 'v.onScreen: ' + v.onScreen + '\n';
                t += 'v.inViewport: ' + v.inViewport;

              }}
              initiallyVisible={true}>
              <div className='flex flex-col justify-center items-center'>
                <span className='text-[30px] font-medium'>1996</span>
                <span className='text-center'>AÑO DE FUNDACIÓN</span>
              </div>
            </ScrollAnimation>
          </div>

          <div className='relative block  md:grid md:grid-cols-2 w-[100%] mt-5 ' style={{ with: '100%' }}>


            <ScrollAnimation animateIn='bounceInRight'>

              <button type="button" onClick={() => handlerSeeMore('PORQUE')} className="relative w-full border-[2px] md:min-w-[300px] md:max-w-[300px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-[12px] px-5 py-2.5 text-center inline-flex items-center my-2">
                ¿POR QUE ELEGIRNOS? saber {seeMore === 'PORQUE' ? 'menos' : 'mas'}...
                <span className={seeMore === 'PORQUE' ? 'absolute right-5 rotate-[270deg]' : 'absolute right-5 rotate-90'}>{'>'}</span>

              </button>

            </ScrollAnimation>

            <div className={`col-span-2 text-center transition-all w-[100%] ${seeMore === 'PORQUE' ? 'h-auto py-5' : 'h-0'} text-[14px] overflow-hidden text-white lg:hidden`} id='PorQueElegirnos'>

              <h4 className='text-[26px] text-center font-bold text-[#F7BE38]  py-5' >¿POR QUE ELEGIRNOS?</h4>
              <p className='text-left '>
                •	Nuestro servicio está orientado a estándares de calidad, estamos comprometidos a darle una atención personalizada y crear soluciones logísticas inteligentes de acuerdo a cada negocio.
              </p>
              <p className='text-left '>
                •	Sabemos la responsabilidad que conlleva nuestro servicio por lo cual cada que se nos asigna una operación la llevamos a cabo con un riguroso control para optimizar los recursos a utilizar.
              </p>
            </div>

            <ScrollAnimation animateIn='bounceInRight'>

              <button type="button" onClick={() => handlerSeeMore('MISION')} className="relative w-full border-[2px] md:min-w-[300px] md:max-w-[300px] text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-[12px] px-5 py-2.5 text-center inline-flex items-center mt-[20px] lg:mt-2 my-2">
                MISIÓN y VISIÓN saber {seeMore === 'MISION' ? 'menos' : 'mas'}...
                <span className={seeMore === 'MISION' ? 'absolute right-5 rotate-[270deg]' : 'absolute right-5 rotate-90'}>{'>'}</span>

              </button>

            </ScrollAnimation>


          </div>

          <div className={`col-span-2 text-center transition-all md:grid grid-cols-2 ${seeMore === 'MISION' ? 'h-auto py-5' : 'h-0'} text-[14px] overflow-hidden text-white`}>



            <div className='md:px-[20px] text-[16px]'>
              <h4 className='text-[26px] text-center font-bold text-[#F7BE38]  py-5'>MISION</h4>
              Nuestra misión es integrarnos en la cadena de suministro de nuestros clientes como un aliado estratégico, optimizando y cuidando cada proceso para garantizar la máxima eficiencia. Nos comprometemos a simplificar la logística de tal manera que nuestros clientes puedan enfocarse en su negocio principal, asegurando al mismo tiempo una reducción significativa de costos. En Logistics Gear, no solo transportamos mercancías; facilitamos soluciones logísticas integrales que aceleran el éxito de nuestros clientes.


            </div>
            <div className='md:px-[20px]  text-[16px]'>
              <h4 className='text-[26px] text-center font-bold text-[#F7BE38] py-5'>VISION</h4>
              Nuestra visión es consolidarnos como el referente indiscutible en el sector logístico, ganándonos la confianza plena de nuestros clientes a través de la excelencia, innovación y un servicio impecable. Aspiramos a ser reconocidos por nuestra capacidad de superar expectativas, adaptarnos a los cambios del mercado con agilidad y liderar el camino hacia un futuro donde la eficiencia logística y la sostenibilidad van de la mano. En Logistics Gear, nos comprometemos a ser sinónimo de confiabilidad y calidad, estableciendo nuevos estándares en la industria y expandiendo nuestra presencia global para conectar aún más el mundo con nuestros servicios.
            </div>
          </div>
          <div className={`col-span-2 text-center transition-all w-[50%] ${seeMore === 'PORQUE' ? 'h-auto py-5' : 'h-0'} text-[14px] overflow-hidden text-white hidden lg:block `} id='PorQueElegirnos'>

            <h4 className='text-[26px] text-center font-bold text-[#F7BE38]  py-5' >¿POR QUE ELEGIRNOS?</h4>
            <p className='text-left '>
              •	Nuestro servicio está orientado a estándares de calidad, estamos comprometidos a darle una atención personalizada y crear soluciones logísticas inteligentes de acuerdo a cada negocio.
            </p>
            <p className='text-left '>
              •	Sabemos la responsabilidad que conlleva nuestro servicio por lo cual cada que se nos asigna una operación la llevamos a cabo con un riguroso control para optimizar los recursos a utilizar.
            </p>
          </div>



        </div>

      </section>



      {cliente['terrestre'] && <Section subtitle={cliente['terrestre'].titulo} description={cliente['terrestre'].content} video={cliente['terrestre'].url} degrade='#00000067' tarjetas={cliente['terrestre'].tarjetas} miniTarjetas={cliente['terrestre'].miniTarjetas} id={'terrestre'}></Section>}
      {cliente['maritimo'] && <Section subtitle={cliente['maritimo'].titulo} description={cliente['maritimo'].content} video={cliente['maritimo'].url} degrade='#00000067' tarjetas={cliente['maritimo'].tarjetas} miniTarjetas={cliente['maritimo'].miniTarjetas} id={'maritimo'}></Section>}
      {cliente['aereo'] && <Section subtitle={cliente['aereo'].titulo} description={cliente['aereo'].content} video={cliente['aereo'].url} degrade='#00000067' tarjetas={cliente['aereo'].tarjetas} miniTarjetas={cliente['aereo'].miniTarjetas} id={'aereo'}></Section>}
      {cliente['despachos'] && <Section subtitle={cliente['despachos'].titulo} description={cliente['despachos'].content} video={cliente['despachos'].url} degrade='#00000067' tarjetas={cliente['despachos'].tarjetas} miniTarjetas={cliente['despachos'].miniTarjetas} id={'despachos'}></Section>}
      {cliente['proyecto'] && <Section subtitle={cliente['proyecto'].titulo} description={cliente['proyecto'].content} video={cliente['proyecto'].url} degrade='#00000067' tarjetas={cliente['proyecto'].tarjetas} miniTarjetas={cliente['proyecto'].miniTarjetas} id={'proyecto'}></Section>}
      {cliente['exportaciones'] && <Section subtitle={cliente['exportaciones'].titulo} description={cliente['exportaciones'].content} video={cliente['exportaciones'].url} degrade='#00000067' tarjetas={cliente['exportaciones'].tarjetas} miniTarjetas={cliente['exportaciones'].miniTarjetas} id={'exportaciones'}></Section>}
      {cliente['farmaceutico'] && <Section subtitle={cliente['farmaceutico'].titulo} description={cliente['farmaceutico'].content} video={cliente['farmaceutico'].url} degrade='#00000067' tarjetas={cliente['farmaceutico'].tarjetas} miniTarjetas={cliente['farmaceutico'].miniTarjetas} id={'farmaceutico'}></Section>}





      <Footer></Footer>




    </main>

  )
}




{/* <form className="max-w-md py-5">
                  <div class="relative z-0 w-full mb-5 group ">
                    <input type="email" name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                    <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Origen</label>
                  </div>

                  <div class="relative z-0 w-full mb-5 group ">
                    <input type="email" name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                    <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Destino</label>
                  </div>
                  <div class="relative z-0 w-full mb-5 group ">
                    <input type="email" name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                    <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso</label>
                  </div>
                  <div class="relative z-0 w-full mb-5 group ">
                    <input type="email" name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                    <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Volumen</label>
                  </div>
                  <div class="relative z-0 w-full mb-5 group ">
                    <input type="email" name="floating_email" id="floating_email" class="block shadow-xl  py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#dddddd] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]" placeholder=" " required />
                    <label for="floating_email" class="z-50 peer-focus:font-medium absolute text-[12px] bg-white px-5 mx-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mercancia</label>
                  </div>



                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] w-full  px-5 py-2.5 text-center ">Continuar</button>
                </form> */}
