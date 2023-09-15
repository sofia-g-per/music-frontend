<template>
        <add-album-form :validationSchema="schema" :initialValues="[]" :submitURL="addAlbumURL" @onSubmitSuccessful="handleSuccessfulSubmit">

        </add-album-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddAlbumForm from '@/components/forms/AddAlbumForm.vue'
import { useForm } from 'vee-validate';
export default defineComponent({
    name: "AddAlbumPage",
    components: {
        AddAlbumForm
    },
    setup(){
        const schema = {
            name: 'required',
            releaseDate: {
                "required": true,
                "isReleaseDateValid": true
            },
            coverImg: "mimes:image/jpeg,image/jpg,image/png",
            songIds: (value) => {
                if (value && value.length) {
                    return true;
                }
                
                return 'Выберите хотя бы одну песню';
            }
      }

        const { errors } = useForm({
            validationSchema: schema,
            });

        return {
            schema,
            errors
        }
    },
    methods: {
        handleSuccessfulSubmit(){
            this.$router.push('/my-albums');
        }
    },
    computed: {
        addAlbumURL(){
            return this.$store.getters.fullURL('createAlbum')
        }
    }
})
</script>
