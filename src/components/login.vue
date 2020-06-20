<template>
	<div>
		<div style="display: flex;justify-content: center;margin-top: 150px">
			<el-card style="width: 400px">
				<div slot="header" class="clearfix"><span>登录</span></div>
				<table>
					<tr>
						<td>用户名</td>
						<td><el-input v-model="user.username" placeholder="请输入用户名"></el-input></td>
					</tr>
					<tr>
						<td>密码</td>
						<td><el-input type="password" v-model="user.password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input></td>
					</tr>
					<tr>
						<td colspan="2"><el-button style="width: 300px" type="primary" @click="doLogin();">登录</el-button></td>
					</tr>
				</table>
			</el-card>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			user: {
				username: 'zhangsan',
				password: '123456',
				student: {
					name: 'lisi',
					age: '123456',
					child: [
						{
							childName: '小黑',
							childAget: '小明',
							user:{
								username: '李琦',
								password: '123456',
								list:[
									'1','2','3'
								]
							}
						},
						{
							username: 'zhangsan',
							password: '123456',	
						}
					]
				}
			}
		};
	},
	methods: {
		doLogin() {
			this.$http.get('/api/get', this.user).then(
				res => {
					console.log(res);
				},
				err => {
					console.log(err.message);
				}
			);
		},
	}
};
</script>
