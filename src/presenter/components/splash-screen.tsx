function SplashScreen() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center flex-1 bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mx-auto"></div>
        <h1 className="text-2xl text-white font-bold mt-4">Loading...</h1>
      </div>
    </div>
  );
}

export default SplashScreen;
