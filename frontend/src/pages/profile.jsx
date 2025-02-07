import React from "react";

function ProfileCard() {
  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 min-w-[380px] max-w-[450px] md:max-w-[550px] lg:max-w-[650px] h-auto rounded-2xl shadow-lg shadow-stone-700 dark:shadow-red-500">
        <header className="bg-[url('/images/bg-pattern-card.svg')] bg-no-repeat bg-cover bg-center h-32 md:h-40 lg:h-48 rounded-t-2xl flex justify-center items-center">
          <img
            className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 border-4 border-white rounded-full -mt-16"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpK6DibZ8rjt974_abGKBQgsHJos2hJkxU_g&s"
            alt="Profile"
          />
        </header>
        <h1 className="font-bold text-xl md:text-2xl text-center p-4 text-gray-900 dark:text-white">
          John Doe <span className="font-normal text-gray-500 dark:text-gray-400">@johndoe</span>
        </h1>
        <h2 className="font-normal text-gray-500 dark:text-gray-400 text-center pb-4">
          San Francisco, CA
        </h2>
        <div className="flex border-t border-gray-300 dark:border-gray-700 text-center">
          <div className="flex-1 p-6">
            <h1 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">1.5K</h1>
            <h2 className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">Followers</h2>
          </div>
          <div className="flex-1 p-6">
            <h1 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">800</h1>
            <h2 className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">Likes</h2>
          </div>
          <div className="flex-1 p-6">
            <h1 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">150</h1>
            <h2 className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">Photos</h2>
          </div>
        </div>
      </div>
   
    </div>
  );
}

export default ProfileCard;
