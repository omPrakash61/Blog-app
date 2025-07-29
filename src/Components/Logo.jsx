function Logo() {
  return (
    <div className="relative flex items-center justify-center p-4">
      <div className="absolute w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-2xl animate-spin-slow opacity-40"></div>

      {/* Logo Image */}
      <img
        src="/Logo3.png"
        alt="Logo"
        className="relative z-10 w-[90px] drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform duration-500 ease-in-out rounded-xl"
      />
    </div>
  );
}

export default Logo;
