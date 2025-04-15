<script>
import {debounce} from "../../../../utils/helpers";
export default {
    props:{
        label:{},
        value:{},
        multiple:{
            required:false,
            default:false
        },
        disabled:{
            type:Boolean,
            default:false,
        },
        debounced:{
            type:Boolean,
            default:false
        },
        debounceTime:{
            type:Number,
            default:700
        },
        hideDetails:{
            type:Boolean,
            default:false
        },
        placeholder:{},
        name:{},
        rules:{
            type:String,
            default:"required"
        },
        type:{
            required:false,
            default:"text"
        },
        loading:{
            required:false,
            default:false
        },
        placeholder:{
            required:false
        }
    },
    data() {
        return {
            input:this.value
        }
    },
    watch:{
        value(value) {
            if (value == this.input) {
                return;
            }
            this.input = value;
        }
    },
    created() {
        if (this.value === 0) {
            this.value = 0;
        }else{
            this.input = this.value ? this.value : "";
        }

        if (this.debounced) {
            this.$watch(
                "input",
                debounce(function(input){
                    this.$emit("input",input);
                },this.debounceTime)
            );
        }else{
            this.$watch("input",function(input){
                this.$emit("input",input);
            });
        }
    }
}
</script>