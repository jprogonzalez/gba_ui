<template>
  	<ValidationObserver class="full-height pa-0" ref="form" v-slot="{ valid }">
		<v-container class="full-height pa-0 ma-0 fill-height">
	  		<v-row class="full-height pa-0 ma-0 fill-height no-gutters">
				<v-col
					cols="12"
					lg="7"
					xl="7"
					md="7"
					class="pa-0 ma-0 full-height d-none d-lg-flex d-md-flex d-xl-flex background-image-col"
				>
					<div
						class="position-absolute"
						style="
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							max-width: 90%;
						"
					>
						
					</div>
				</v-col>
				<v-col cols="12" class="d-lg-none d-md-none d-xl-none">
					<v-app-bar
						dense
						app
						class="text-center d-flex justify-center mb-2"
					>	
						
					</v-app-bar>
				</v-col>
				<v-col
					cols="12"
					lg="5"
					xl="5"
					md="5"
					class="d-flex pa-0 ma-0 full-height justify-center align-center"
				>
					<v-container class="pa-3 pa-lg-10 pa-md-10 pa-xl-10">
						<v-row
							class="d-lg-flex d-md-flex d-xl-flex justify-lg-center justify-md-center justify-xl-center full-height pa-0 ma-0"
						>
							<v-col cols="12" class="mb-0 pb-0">
								<p
									class="subtitle-1 font-weight-light grey--text text--darken-2 pa-0 pb-0 mb-0"
								>
									Ingrese la información de su cuenta a continuación
								</p>
							</v-col>
							<v-col cols="12" v-if="messageApiError">
								<v-alert border="top" color="red lighten-2" dark  type="error">
									{{messageApiError}}
								</v-alert>
							</v-col>
							<v-col cols="12" class="mt-0 pt-0">
								<ValidationProvider
									vid="email"
									slim
									name="email"
									rules="required|email|max:255"
									v-slot="{errors}"
								>
									<v-text-field
										v-model="user.email"
										class="mt-5"
										color="blue-grey darken-4 elevation-2"
										outlined
										label="Dirección de correo electrónico"
										name="email"
										dense
										hide-details="auto"
										placeholder="example@inventix.com.mx"
										:error-messages="[...errors, formErrors.email].filter(Boolean)"
										v-on:keyup.13="loginReturn"
										data-cy="email"
										append-icon="mdi-email-check"
									/>
								</ValidationProvider>
							</v-col>
							<v-col cols="12">
								<ValidationProvider
									vid="password"
									slim
									name="password"
									rules="required|max:255"
									v-slot="{errors}"
								>
									<v-text-field
										outlined
										color="blue-grey darken-4 elevation-2"
										v-model="user.password"
										:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
										:type="showPassword ? 'text' : 'password'"
										name="password"
										hide-details="auto"
										label="Contraseña"
										dense
										@click:append="showPassword = !showPassword"
										class="mt-1"
										:error-messages="[...errors, formErrors.password].filter(Boolean)"
										v-on:keyup.13="loginReturn"
										data-cy="password"
										placeholder="********"
									/>
								</ValidationProvider>
								
							</v-col>
							<v-col cols="12" class="pt-3">
								<v-btn
									:disabled="!valid"
									:loading="waitingResponse"
									class="primary--bg white--text"
									large
									block
									@click="login"
								>
									Acceder
								</v-btn>
							</v-col>
							
						</v-row>
					</v-container>
				</v-col>
	  		</v-row>
		</v-container>
  	</ValidationObserver>
</template>
<script>
import Api from "../services/api";

export default {
  name: "Login",
  components:{
  },
	data() {
		return {
			user: {
				email: "",
				password: "",
				remember: false,
			},
			showPassword: false,
			waitingResponse: false,
			formErrors:{},
			messageApiError:null
		};
	},
	methods: {
		register() {
			this.$router.replace({ name: "register" });
		},
		async loginReturn() {
			const result = await this.$refs.form.validate();
			if (result) {
				this.login();
			}
		},
		async login() {

			this.waitingResponse = true;
			this.passwordError = "";
			this.emailError = "";

			try {

				const resp = await Api.post("auth", this.user);

				const token = resp.access_token;
				const user = resp.user;

				localStorage.setItem("auth-token", token);
				localStorage.setItem("auth-profile", JSON.stringify(user));

				this.$router.replace({ name: "employees" });

				
			} catch (error) {
				this.messageApiError = error?.message;

				let {errors} = error;

				this.formErrors = {};

				if (errors) {
					for(let field in errors) {
						if (errors[field]) {
							this.$set(this.formErrors,field,errors[field].join(','));
						}
					}
				}

			}
			this.waitingResponse = false;
		},
	},
};
</script>


<style scoped>
	.full-height {
		height: 100vh;
	}

	.fill-height {
		height: 100%;
	}

	.background-image-col {
		background-image: url("https://res.cloudinary.com/dpdmqwday/image/upload/v1738644806/2149411523_nxxfq7.jpg");
		background-size: cover;
		background-position: center;
		position: relative;
	}

	.position-absolute {
		position: absolute;
	}
</style>