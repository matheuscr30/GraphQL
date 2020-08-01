<template>
	<v-layout column>
		<v-flex>
			<LoggedUser />
		</v-flex>
		<v-flex>
			<v-tabs centered  dark icons-and-text>
				<v-tabs-slider color="white"></v-tabs-slider>

				<v-tab>
					Authentication
					<v-icon>fingerprint</v-icon>
				</v-tab>

				<v-tab>
					Users
					<v-icon>people</v-icon>
				</v-tab>

				<v-tab>
					Profiles
					<v-icon>how_to_reg</v-icon>
				</v-tab>

				<v-tab-item>
					<AuthTabs />
				</v-tab-item>

				<v-tab-item>
					<UserTabs />
				</v-tab-item>

				<v-tab-item>
					<ProfileTabs />
				</v-tab-item>
			</v-tabs>
		</v-flex>
	</v-layout>
</template>

<script>
import AuthTabs from './auth/AuthTabs'
import LoggedUser from './auth/LoggedUser'
import UserTabs from './user/UserTabs'
import ProfileTabs from './profile/ProfileTabs'

export default {
	components: {
		AuthTabs,
		LoggedUser,
		UserTabs,
		ProfileTabs,
	},
}
</script>

<style>

</style>
