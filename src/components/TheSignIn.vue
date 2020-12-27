<template>
  <div
    class="flex flex-col rounded-md px-8 pt-6 pb-8 m-auto mt-16 w-5/6 md:w-3/5 lg:w-1/2"
  >
    <div class="mb-4">
      <label class="block text-gray-800 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-800"
        id="username"
        type="text"
        placeholder="Username"
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-800 text-sm font-bold mb-2" for="password">
        Password
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-500 float-right"
          href="#"
        >
          Forgot Password?
        </a>
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3"
        id="password"
        type="password"
        placeholder="*********"
      />
      <!-- <p class="text-red text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        type="button"
      >
        Sign In
      </button>
      <div>
        <span>New to Flatmate? </span>
        <router-link
          to="/auth"
          class="text-blue-400 hover:text-blue-500 font-bold"
          >Create an account</router-link
        >
      </div>
    </div>
  </div>
</template>
