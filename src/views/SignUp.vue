<template>
  <div
    id="signup"
    class="flex flex-col rounded-md px-8 pt-6 pb-8 m-auto mt-16 w-5/6 md:w-3/5 lg:w-1/2"
  >
    <div class="mb-4">
      <label class="block text-gray-800 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-800"
        type="text"
        placeholder="Username"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-800 text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-800"
        type="text"
        placeholder="Email"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-800 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3"
        type="password"
        placeholder="*********"
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-800 text-sm font-bold mb-2" for="password">
        Conform Password
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3"
        type="password"
        placeholder="*********"
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        type="button"
      >
        Sign Up
      </button>
      <div>
        <span>Already have an account? </span>
        <router-link
          to="/signin"
          class="text-blue-400 hover:text-blue-500 font-bold"
          >Sign in instead</router-link
        >
      </div>
    </div>
  </div>
</template>
