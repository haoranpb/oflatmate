<template>
  <div
    id="signin"
    class="flex flex-col rounded-md px-8 pt-6 pb-8 m-auto mt-16 w-5/6 md:w-3/5 lg:w-1/2"
  >
    <div class="mb-4">
      <label class="block text-gray-800 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-800"
        v-model="email"
        type="text"
        placeholder="Email"
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
        :class="{ 'border-red-400': isError }"
        v-model="password"
        type="password"
        placeholder="*********"
      />
      <p class="text-red-600 text-sm" v-if="isError">{{ errorMessage }}</p>
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        type="button"
        @click="signin"
      >
        Sign In
      </button>
      <div>
        <span>New to Flatmate? </span>
        <router-link
          to="/signup"
          class="text-blue-400 hover:text-blue-500 font-bold"
          >Create an account</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Email & password validation
export default {
  data() {
    return {
      email: '',
      password: '',
      isError: false,
      errorMessage: '',
    }
  },
  methods: {
    signin() {
      const self = this
      const params = new URLSearchParams()
      params.append('email', this.email)
      params.append('password', this.password)

      this.$http({
        method: 'post',
        url: '/auth/signin',
        data: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((response) => {
          self.isError = false
          self.$router.push('/user')
          console.log(response.data)
        })
        .catch((error) => {
          if (error.response.status == 401) {
            self.errorMessage = error.response.data
            self.isError = true
          } else {
            self.$router.push('/error')
          }
        })
    },
  },
}
</script>
