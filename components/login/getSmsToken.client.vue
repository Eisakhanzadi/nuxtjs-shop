<script setup lang="ts">
import VOtpInput from "vue3-otp-input";

const token = ref<number | string>("")
</script>

<template>
  <client-only>
    <div>
      <div class="flex">
        <v-otp-input
            dir="ltr"
            ref="otpInput"
            input-classes="otp-input"
            :conditionalClass="['one', 'two', 'three', 'four']"
            separator=" "
            inputType="letter-numeric"
            :num-inputs="4"
            v-model="token"
            :should-auto-focus="true"
            :should-focus-order="true"
            @on-change=""
            @on-complete=""
            :placeholder="['', '', '', '']"
        />
      </div>
    </div>
  </client-only>
</template>

<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}

.otp-input.is-complete {
  background-color: rgb(0 255 0 / 18%);
  border: 1px solid rgb(0 255 0 / 90%);
  color: var(--color-444);
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>