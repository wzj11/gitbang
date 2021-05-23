import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({  
  state: {  
    login: false,  
    token: '',  
    avatarUrl: '',  
    userName: '' ,
		openid: ''
  },  
  mutations: {  
    login(state, res) {  
			console.log(res,'login')
      console.log(state)  
      state.login = true
			state.avatarUrl = res.avatarUrl
			state.userName = res.nickName
    },  
    logout(state) {  
      state.login = false;  
      state.token = '';  
      state.userName = '';  
      state.avatarUrl = '';
			state.openid = '';
    },
		getopenid(state,openid) {
			state.openid = openid
		},
		adduserinfo(state) {
			uniCloud.callFunction({
				name:'getuserinfo',
				data:state,
				success(res) {
					console.log(res.result.data.length)
					if (res.result.data.length == 0) {
						uniCloud.callFunction({
							name:'adduserinfo',
							data:state,
							success(res) {
								console.log(res)
							}
						})
					}
				}
			})
		}
  }  
})

export default store