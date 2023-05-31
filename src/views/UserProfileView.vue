<template>
	<q-page :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-4'">
		<q-card flat square>
			<q-card-section class="text-center">
				<div class="text-h3">{{ getDisplayName(userStore.openedUser) }}</div>
				<q-img
					class="q-pa-sm"
					:src="
						userStore.openedUser?.picture ? userStore.openedUser.picture : 'https://pic.onlinewebfonts.com/svg/img_329115.png'
					"
					width="100px"
				/>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script setup lang="ts">
	import { useUserStore } from "@stores/user";
	import { getDisplayName } from "@utils/userHelper";

	const userStore = useUserStore();
</script>

<style scoped></style>
