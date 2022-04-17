<template>
    <div class="sign-up-page-wrapper">
        <signup-form>

        </signup-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignupForm from '@/components/forms/SignupForm.vue'
export default defineComponent({
    name: "SignupPage",
    components: {
        SignupForm
    },
})
</script>
