import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Github, Link, Linkedin, Mail} from 'lucide-react';
import Particles from '../RareBits/Particles';
import { NavLink } from 'react-router';
import TextType from '../RareBits/TextType';
import ScrollVelocity from '../RareBits/ScrollVelocity';

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
    const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (

    // <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white font-sans">
    //   {/* Navbar */}
    //   <header className="bg-black/30 backdrop-blur sticky top-0 z-50 shadow-lg">
    //     <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    //       <h1 className="text-3xl font-bold text-emerald-400">ByteLeaf</h1>

    //       {/* Mobile Toggle */}
    //       <button
    //         className="md:hidden text-white"
    //         onClick={() => setIsOpen(!isOpen)}
    //         aria-label="Toggle Menu"
    //       >
    //         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    //       </button>

    //       {/* Nav Links */}
    //       <nav className="space-x-6 hidden md:flex">
    //         <a href="#features" className="hover:text-emerald-400 transition">Features</a>
    //         <a href="#about" className="hover:text-emerald-400 transition">About</a>
    //         <a href="#contact" className="hover:text-emerald-400 transition">Contact</a>
    //       </nav>

    //       <button className="hidden md:block bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md shadow transition">
    //         Join Now
    //       </button>
    //     </div>

    //     {/* Mobile Nav */}
    //     {isOpen && (
    //       <div className="md:hidden bg-black text-white px-6 pb-4 space-y-2">
    //         <a href="#features" className="block hover:text-emerald-400">Features</a>
    //         <a href="#about" className="block hover:text-emerald-400">About</a>
    //         <a href="#contact" className="block hover:text-emerald-400">Contact</a>
    //         <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md shadow transition">
    //           Join Now
    //         </button>
    //       </div>
    //     )}
    //   </header>
      

    //   {/* Hero Section */}
    //   <section className="py-24 px-6 text-center">
        
    //     <motion.h2
    //       className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-6"
    //       initial={{ opacity: 0, y: -50 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.8 }}
    //     >
    //       Level Up Your Coding
    //     </motion.h2>
    //     <motion.p
    //       className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10"
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ delay: 0.4 }}
    //     >
    //       Practice DSA, build skills, and crack interviews like a pro – all in one platform.
    //     </motion.p>
    //     <motion.button
    //       className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-md font-semibold flex items-center justify-center mx-auto text-white"
    //       whileHover={{ scale: 1.05 }}
    //     >
    //       Start Practicing <ArrowRight className="ml-2 w-5 h-5" />
    //     </motion.button>
    //   </section>
    //   <div className="m-2 p-2 divider"></div>

    //   {/* Features Section */}
    //   <section id="features" className="py-20 px-6 ">
    //     <h3 className="text-4xl font-bold text-center mb-16 text-white">What You Get</h3>
    //     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
    //       {[{
    //         title: 'Real-Time Judge',
    //         icon: '🧠',
    //         desc: 'Code and get instant feedback with Judge0 integration.'
    //       }, {
    //         title: 'Track Progress',
    //         icon: '📈',
    //         desc: 'Monitor your daily practice, streaks, and improvements.'
    //       }, {
    //         title: 'Competitive Leaderboard',
    //         icon: '🏆',
    //         desc: 'Compete with coders globally and climb the ranks.'
    //       }].map((feature, index) => (
    //         <motion.div
    //           key={index}
    //           className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-emerald-500 transition"
    //           whileHover={{ scale: 1.05 }}
    //         >
    //           <div className="text-5xl mb-4">{feature.icon}</div>
    //           <h4 className="text-2xl font-semibold mb-2 text-emerald-400">{feature.title}</h4>
    //           <p className="text-gray-300">{feature.desc}</p>
    //         </motion.div>
    //       ))}
    //     </div>
    //   </section>

    //   {/* About Section */}
    //   <section id="about" className="py-20 px-6 ">
    //     <div className="max-w-4xl mx-auto text-center">
    //       <h3 className="text-3xl font-bold text-emerald-400 mb-6">Why CodeCrush?</h3>
    //       <p className="text-gray-300 text-lg">
    //         Inspired by platforms like LeetCode, CodeCrush brings you a sleek UI, better UX, and smoother developer experience.
    //         We aim to help you learn, grow, and get job-ready faster with modern tools and design.
    //       </p>
    //     </div>
    //   </section>

    //   {/* Footer */}
    //   <footer className="bg-gray-950 py-6 text-center">
    //     <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} CodeCrush. Built with ❤️ by Devs for Devs.</p>
    //   </footer>
    // </div>
      <div className="min-h-screen w-full bg-gradient-to-br from-base-200 via-green-900  bg-lime-700 scroll-smooth" data-theme="green"> 
        <div className='relative flex justify-center w-full bg-gray-800/20  min-h-screen' >
          
          <motion.nav
          initial={{ opacity: 0, y: -50 }}
            animate= {{opacity: 1, y: 0} }
            transition={{ duration: 0.8, ease: 'easeOut' }}
           className="navbar max-w-[70%] flex justify-between rounded-xl fixed top-2 backdrop-blur-md bg-black/30 border-b border-white/20 shadow-lg px-4 z-50">
          <div className="flex-1  max-w-fit">
            <NavLink to="/hero" className=" text-xl">
                <svg width="150.60999603271486" height="40.355708112895186" viewBox="0 0 369.6666666666667 71.85665615405215" class="looka-1j8o68f"><defs id="SvgjsDefs3176"><linearGradient id="SvgjsLinearGradient3181"><stop id="SvgjsStop3182" stop-color="#006838" offset="0"></stop><stop id="SvgjsStop3183" stop-color="#96cf24" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient3184"><stop id="SvgjsStop3185" stop-color="#006838" offset="0"></stop><stop id="SvgjsStop3186" stop-color="#96cf24" offset="1"></stop></linearGradient></defs><g id="SvgjsG3177" featurekey="pxMwYC-0" transform="matrix(0.9683402273790989,0,0,0.9683402273790989,-6.814285617399343,-13.040637849502174)" fill="url(#SvgjsLinearGradient3181)"><g xmlns="http://www.w3.org/2000/svg"><path fill="url(#SvgjsLinearGradient3181)" d="M84.341,13.467c-26.908,1.188-36.266,19.399-37.689,23.676c0,0,8.551,14.26,7.156,17.894   c0.839-2.188,1.607-4.048,2.348-5.656c-0.181-0.613-0.449-1.584-0.719-2.78c-0.47-2.089-0.941-4.864-0.942-7.636   c0-1.31,0.106-2.62,0.37-3.858c0.141-0.656,0.325-1.292,0.565-1.897c-0.637-0.572-0.729-1.548-0.194-2.233   c0.558-0.716,1.593-0.844,2.309-0.285c0.716,0.559,0.844,1.594,0.284,2.31c-0.394,0.505-1.025,0.717-1.613,0.601   c-0.205,0.533-0.369,1.099-0.495,1.688c-0.249,1.163-0.351,2.413-0.351,3.676c0,2.589,0.432,5.225,0.877,7.25   c0.164,0.75,0.332,1.417,0.479,1.964c2.4-4.888,4.628-7.293,8.276-10.049l-0.016-0.015l0.298-0.319l0.003-0.003l0.011-0.01   c0.009-0.011,0.021-0.023,0.039-0.044c0.034-0.038,0.087-0.095,0.153-0.169c0.134-0.15,0.328-0.373,0.57-0.66   c0.485-0.574,1.158-1.402,1.908-2.421c1.245-1.692,2.704-3.909,3.865-6.339c-0.534-0.434-0.756-1.176-0.501-1.855   c0.321-0.851,1.27-1.279,2.119-0.959c0.852,0.32,1.282,1.269,0.96,2.119c-0.276,0.737-1.026,1.158-1.776,1.049   c-1.197,2.512-2.689,4.777-3.962,6.505c-0.67,0.912-1.279,1.671-1.755,2.24v0.002c-1.321,2.63-2.892,5.002-4.365,7.919   c0.573-0.061,1.28-0.156,2.066-0.3c2.107-0.388,4.807-1.143,7.152-2.579c1.115-0.683,2.151-1.517,3.012-2.536   c-0.389-0.49-0.482-1.183-0.18-1.777c0.415-0.81,1.405-1.131,2.215-0.716c0.809,0.413,1.129,1.405,0.716,2.213   c-0.385,0.751-1.266,1.082-2.039,0.793c-0.941,1.128-2.068,2.037-3.267,2.77c-1.656,1.012-3.45,1.694-5.104,2.153   c-2.064,0.573-3.916,0.807-5.024,0.9v0.001c-2.116,4.434-3.949,10.205-4.429,19.792C57.951,60.347,78.907,51.8,78.907,51.8   C86.226,27.926,84.341,13.467,84.341,13.467z"></path><path fill="url(#SvgjsLinearGradient3181)" d="M18.923,19.807c-23.563,30.705-7.797,61.057,10.241,64.968c0,0,13.673,0.722,16.281,2.898   c-6.789-5.664-11.151-11.769-13.95-17.403c-0.491,0.049-0.972,0.072-1.443,0.072c-3.234,0-6.008-1.093-8.205-2.448   c-1.476-0.911-2.695-1.944-3.627-2.854c-0.682,0.366-1.549,0.207-2.053-0.416c-0.572-0.705-0.463-1.743,0.243-2.314   c0.706-0.571,1.743-0.462,2.314,0.245c0.447,0.553,0.477,1.306,0.132,1.881c0.893,0.871,2.055,1.853,3.451,2.713   c2.097,1.296,4.711,2.319,7.745,2.319c0.339,0,0.684-0.013,1.034-0.039c-1.863-3.936-2.971-7.612-3.626-10.717   c-0.585-0.167-1.536-0.471-2.658-0.949c-1.867-0.797-4.214-2.077-6.135-4.039c-0.918-0.938-1.737-2.032-2.348-3.303   c-0.815,0.092-1.59-0.439-1.784-1.257c-0.208-0.884,0.34-1.771,1.224-1.979c0.884-0.208,1.771,0.338,1.979,1.223   c0.155,0.653-0.104,1.308-0.606,1.689c0.551,1.125,1.28,2.104,2.104,2.959c1.177,1.218,2.549,2.173,3.867,2.905   c1.64,0.913,3.194,1.478,4.161,1.78c-0.125-2.99-0.408-5.313-0.726-6.75c-0.046-0.205-0.086-0.42-0.117-0.657   c-0.073-0.546-0.105-1.202-0.105-2.187c0-1.965,0.129-5.25,0.365-11.57c-0.688-0.219-1.176-0.874-1.148-1.63   c0.034-0.907,0.796-1.616,1.705-1.583c0.907,0.034,1.616,0.796,1.583,1.705c-0.028,0.757-0.562,1.375-1.266,1.54   c-0.235,6.32-0.363,9.61-0.363,11.538c0,0.965,0.032,1.585,0.098,2.071c0.048,0.36,0.113,0.653,0.2,0.973   c0.001,0.004,0.003,0.007,0.003,0.01c0.349,1.123,0.828,3.727,4.873,10.771c0.019-0.02,0.038-0.038,0.058-0.058   c0.479-0.485,1.129-1.244,1.797-2.336c1.191-1.943,2.44-4.936,2.861-9.3c-0.661-0.229-1.126-0.868-1.104-1.603   c0.027-0.909,0.787-1.622,1.695-1.595c0.908,0.027,1.622,0.787,1.595,1.694c-0.025,0.776-0.581,1.411-1.309,1.561   c-0.433,4.507-1.73,7.644-2.991,9.702c-0.826,1.346-1.633,2.229-2.17,2.735c1.772,3.259,3.97,6.82,6.577,10.174   c0.472-0.485,1.098-1.228,1.74-2.275c1.191-1.944,2.439-4.935,2.861-9.3c-0.663-0.229-1.126-0.868-1.104-1.604   c0.026-0.907,0.786-1.622,1.694-1.595c0.908,0.028,1.622,0.787,1.594,1.693c-0.023,0.776-0.581,1.412-1.309,1.563   c-0.433,4.506-1.729,7.644-2.989,9.698c-0.716,1.166-1.417,1.984-1.941,2.513c2.752,3.437,5.941,6.611,9.542,8.954   c1.569-5.041,1.904-9.865,1.904-9.865C54.967,32.185,18.923,19.807,18.923,19.807z"></path><path fill="url(#SvgjsLinearGradient3181)" d="M57.288,73.593c0,0-1.847,4.824-2.855,10.158c4.126-1.544,8.255-3.825,11.972-6.185l-0.103,0.025   c-0.006-0.028-0.159-0.679-0.159-1.759c0-1.024,0.139-2.437,0.673-4.06c0.407-1.232,1.042-2.584,2.019-3.979   c-0.47-0.621-0.442-1.508,0.102-2.102c0.614-0.669,1.655-0.715,2.325-0.1c0.669,0.613,0.714,1.654,0.101,2.324   c-0.479,0.522-1.217,0.663-1.835,0.411c-0.91,1.311-1.5,2.572-1.879,3.719c-0.502,1.521-0.63,2.839-0.63,3.785   c0,0.583,0.047,1.025,0.087,1.286c3.746-2.419,9.367-6.709,9.367-6.709c0.942-0.777,0.963-1.261,2.688-2.866   c1.439-1.339,3.419-2.929,5.846-4.26c-0.15-0.747,0.236-1.522,0.963-1.834c0.834-0.36,1.803,0.026,2.162,0.858   c0.359,0.836-0.024,1.803-0.859,2.163c-0.663,0.284-1.411,0.1-1.869-0.406c-2.29,1.261-4.179,2.764-5.566,4.047   c-0.359,0.331-0.687,0.646-0.977,0.94c-1.416,1.602-3.851,4.38-7.429,7.842c0.415,0.093,0.992,0.178,1.699,0.178   c0.999,0,2.257-0.166,3.712-0.72c1.095-0.417,2.304-1.052,3.594-2.008c-0.271-0.622-0.139-1.372,0.386-1.861   c0.665-0.619,1.706-0.583,2.326,0.082c0.619,0.664,0.583,1.705-0.082,2.325c-0.583,0.543-1.455,0.581-2.079,0.134   c-1.361,1.013-2.651,1.696-3.835,2.146c-1.556,0.59-2.926,0.776-4.021,0.776c-1.144,0-1.99-0.2-2.44-0.343   c-3.146,2.993-7.111,6.447-11.975,10.068c0.708-0.036,1.428-0.102,2.15-0.207c29.008-0.996,32.228-28.839,32.228-28.839   C72.151,54.671,63.543,61.018,57.288,73.593z"></path></g></g><g id="SvgjsG3178" featurekey="Vx5QiU-0" transform="matrix(2.921414003427321,0,0,2.921414003427321,98.32573648008528,-5.11480996332519)" fill="url(#SvgjsLinearGradient3184)"><path d="M13 15.42 q0 1 -0.41 1.85 t-1.09 1.46 t-1.57 0.95 t-1.87 0.34 l-6.46 -0.02 l0 -16 l5.76 0 q1.04 0 1.93 0.31 t1.55 0.9 t1.03 1.44 t0.37 1.91 q0 0.9 -0.4 1.74 t-1.06 1.42 q0.52 0.26 0.93 0.66 t0.7 0.89 t0.44 1.04 t0.15 1.11 z M9.18 8.62 q0 -0.58 -0.22 -1 t-0.59 -0.7 t-0.85 -0.42 t-1 -0.14 l-1.82 0 l0 4.4 q0.5 0.02 0.9 0.02 l0.92 0 t1 -0.12 t0.85 -0.38 t0.59 -0.67 t0.22 -0.99 z M9.78 15.24 q0 -0.5 -0.19 -0.92 t-0.52 -0.71 t-0.76 -0.45 t-0.93 -0.16 q-0.68 -0.02 -1.34 -0.01 t-1.34 0.01 l0 4.42 l2.32 0 q0.5 0 1 -0.12 t0.89 -0.39 t0.63 -0.68 t0.24 -0.99 z M25.299999999999997 8.42 l-5.2 13.74 q-0.58 1.54 -1.52 2.22 t-2.24 0.68 q-0.2 0 -0.44 -0.03 t-0.46 -0.09 l-0.96 -2.68 q0.34 0.16 0.7 0.25 t0.68 0.09 q0.68 0 1.24 -0.31 t0.86 -1.15 l0.4 -1.16 l-4.46 -11.56 l3.14 0 l2.66 7.44 l2.5 -7.44 l3.1 0 z M33.04 19.74 q-0.44 0.28 -1.02 0.42 t-1.16 0.14 q-1.02 0 -1.72 -0.25 t-1.12 -0.77 t-0.61 -1.32 t-0.19 -1.88 l0 -5.06 l-1.52 0 l0 -1.3 q1.4 -0.58 2.27 -1.72 t1.19 -2.96 l0.94 0 l0 3.38 l2.92 0 l0 2.6 l-2.92 0 l0 5.26 q0 0.44 0.11 0.72 t0.29 0.44 t0.41 0.22 t0.49 0.06 q0.34 0 0.82 -0.12 t0.82 -0.4 l0 2.54 z M46.68 14.2 q0 0.28 -0.03 0.58 t-0.07 0.62 l-9.24 0 q0.16 0.5 0.45 0.95 t0.71 0.78 t0.95 0.52 t1.17 0.19 q0.78 0 1.56 -0.27 t1.3 -0.73 l1.82 1.82 q-1.2 0.9 -2.35 1.27 t-2.43 0.37 q-1.3 0 -2.43 -0.48 t-1.96 -1.3 t-1.31 -1.93 t-0.48 -2.37 t0.48 -2.37 t1.32 -1.93 t1.96 -1.3 t2.4 -0.48 q1.22 0 2.34 0.45 t1.98 1.25 t1.36 1.91 t0.5 2.45 z M43.66 13.08 q-0.34 -1.1 -1.21 -1.77 t-1.97 -0.67 q-1.08 0 -1.94 0.67 t-1.2 1.77 l6.32 0 z M59.7 20 l-10.82 0 l0 -15.98 l3.16 0 l0 12.98 l7.66 0 l0 3 z M73.04 14.2 q0 0.28 -0.03 0.58 t-0.07 0.62 l-9.24 0 q0.16 0.5 0.45 0.95 t0.71 0.78 t0.95 0.52 t1.17 0.19 q0.78 0 1.56 -0.27 t1.3 -0.73 l1.82 1.82 q-1.2 0.9 -2.35 1.27 t-2.43 0.37 q-1.3 0 -2.43 -0.48 t-1.96 -1.3 t-1.31 -1.93 t-0.48 -2.37 t0.48 -2.37 t1.32 -1.93 t1.96 -1.3 t2.4 -0.48 q1.22 0 2.34 0.45 t1.98 1.25 t1.36 1.91 t0.5 2.45 z M70.02000000000001 13.08 q-0.34 -1.1 -1.21 -1.77 t-1.97 -0.67 q-1.08 0 -1.94 0.67 t-1.2 1.77 l6.32 0 z M84.24 20 l-2.9 0 l0 -0.62 q-0.76 0.52 -1.61 0.72 t-1.75 0.2 q-0.84 0 -1.52 -0.25 t-1.18 -0.72 t-0.77 -1.11 t-0.27 -1.42 q0 -0.98 0.43 -1.71 t1.17 -1.22 t1.73 -0.73 t2.13 -0.24 l1.66 0 q0 -1.02 -0.66 -1.62 t-1.9 -0.6 q-0.6 0 -1.24 0.22 t-1.28 0.8 l-1.7 -1.72 q0.92 -0.88 2.13 -1.36 t2.49 -0.48 q1.2 0 2.14 0.38 t1.52 0.98 q0.76 0.76 1.07 1.7 t0.31 2.4 l0 6.4 z M81.34 17.12 l0 -2.14 l-1.32 0 q-0.6 0 -1.13 0.08 t-0.92 0.27 t-0.62 0.49 t-0.23 0.72 q0 0.6 0.47 0.98 t1.21 0.38 q0.64 0 1.27 -0.2 t1.27 -0.58 z M92.88 6.039999999999999 q-0.42 -0.16 -0.74 -0.21 t-0.7 -0.05 q-0.84 0 -1.19 0.38 t-0.35 1.38 l0 0.92 l1.82 0 l0 2.52 l-1.82 0 l0 9.02 l-2.86 0 l0 -9.02 l-1.4 0 l0 -2.52 l1.4 0 l0 -0.88 q0 -2.18 0.81 -3.32 t2.85 -1.14 q1.16 0 2.18 0.28 l0 2.64 z"></path></g></svg>
            </NavLink>
          </div>
         <div className="flex gap-6 items-center  justify-between">
          <div className="flex gap-6 items-center text-xl justify-between">
          <a href="#home" className="hover:text-green-400">Home</a>
          <a href="#about" className="hover:text-green-400">About</a>
          <NavLink to="/login" className="hover:text-green-400">Login</NavLink>
          </div>
          <NavLink to={"/signup"}>
            <motion.div
              className=' py-2 px-4 bg-gradient-to-r from-green-800 to-lime-600 text-white 
              font-bold rounded-4xl shadow-lg hover:from-green-600 cursor-pointer
              hover:to-lime-700  transition duration-100'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
                >
                Signup 
              </motion.div>
            </NavLink>
         
         </div>
          </motion.nav>
          <div className="w-full flex flex-col items-center justify-center min-h-screen" id='home'>
            <motion.div 
            
            initial={{ opacity: 0, y: 50 }}
            animate={ { opacity: 1, y: 0 } }
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="p-10 flex w-[70%] h-fit mt-20 shadow-2xl rounded-xl backdrop-blur-md bg-black/30">
                  <motion.img
                    src="/img1.png"  // Make sure the image is in the public/ folder
                    alt="Animated Coder"
                    className="w-[35%] mx-auto"
                    animate={{
                      y: [0, -20, 0],  // move up and down
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    
                  />
                  <div className="w-full text-center flex items-center flex-col p-10 text-lime-600">
                    <TextType 
                    className='text-3xl font-bold text-emerald-200'
                      text={["Welcome To ByteLeaf!", "Practice Hub for DSA", "Happy coding!"]}
                      typingSpeed={150}
                      pauseDuration={1500}
                      showCursor={true}
                      cursorCharacter="|"
                      
                    />
                    <h2 className='text-2xl mt-10 mb-10  '>ByteLeaf is not the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.</h2>
                      <NavLink to={"/signup"}>
                      <motion.div
                        className='mt-5 w-60 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                        font-bold rounded-lg shadow-lg hover:from-green-600 cursor-pointer
                        hover:to-emerald-700  transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                         >
                          Create Account  
                        </motion.div>
                        </NavLink>
                  </div>

            </motion.div>

            <div className="max-w-[98%]  m-10">
              <h1 className='text-center font-extrabold text-7xl mb-5 text-lime-100'>Suported Language</h1>
              <ScrollVelocity
                texts={['ByteLeaf', 'C++ javaScript Java']} 
                className="custom-scroll-text text-7xl text-shadow-xs bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent"
              />
            </div>


            <motion.div
            id='about'
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
             className="p-10 flex w-[70%] h-fit m-10 shadow-2xl rounded-xl backdrop-blur-md bg-black/30">
                  <motion.div
                   ref={ref}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                   className="max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                      About Our Platform
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                       <span className="text-green-400 font-semibold">ByteLeaf</span> — your go-to platform for mastering Data Structures and Algorithms (DSA).
                      Whether you're a beginner preparing for your first coding interview or an experienced developer brushing up on fundamentals,
                      we've got you covered with curated problems, real-time code evaluation, and detailed solutions.
                    </p>
                    <p className="mt-4 text-gray-400">
                      Practice. Learn. Get Interview Ready. All in one place.
                    </p>
                  </motion.div>
            </motion.div>


            
          </div>
          
        </div>

      <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Logo or Brand Name */}
        <h2 className="text-2xl font-bold text-green-400">ByteLeaf</h2>

        {/* Links */}
        <ul className="flex space-x-6 text-sm">
          <li><a href="#home" className="hover:text-green-400">Home</a></li>
          <li><a href="#about" className="hover:text-green-400">About</a></li>
          <li><NavLink to="/login" className="hover:text-green-400">Login</NavLink></li>
          
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="" target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5 hover:text-green-400" />
          </a>
          <a href="">
            <Mail className="w-5 h-5 hover:text-green-400" />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5 hover:text-green-400" />
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center mt-6 text-sm text-white/60">
        © 27-07-2025 Built by <span className="text-green-400 font-semibold">Pallab Saha</span>. All rights reserved.
      </div>
    </footer>
      </div>

  );
};

export default LandingPage;
