<template>
<div>
	<div class="title">设置权限</div>
	<!--工具条-->
	<!-- <p>{{dataList}}</p> -->
	
	<!-- <div style='overflow:hidden'>
		<el-row :gutter="20">
    		<el-col :span="4">
				<div class="searchItem">
					<p class="searchTitle">所属系统：</p>
					<el-select v-model="searchkeys.s_system_id" placeholder="请选择">
		                <el-option label="全部" value=""></el-option>
		                <el-option v-for="item in systemList" :label="item.name" :value="item.system_id" :key="item.system_id"></el-option>
		            </el-select>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="searchItem">
					<p class="searchTitle">所属模块：</p>
					<el-select v-model="searchkeys.s_module_id" placeholder="请选择">
		                <el-option label="全部" value=""></el-option>
		                <el-option v-for="item in moduleList.Search" :label="item.Fname" :value="item.Fauthority_id" :key="item.Fauthority_id"></el-option>
		            </el-select>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="searchItem">
					<p class="searchTitle">页面名称：</p>
					<el-input v-model="searchkeys.s_page_name" :maxlength="40" placeholder="请输入页面名称"></el-input>
				</div>
			</el-col>
			<el-col :span="4">
				<p class='searchTitle'>&nbsp;</p>
				<div class="goSearch ">
					<el-button @click="search">搜索</el-button>
		      		<el-button @click="clearForm('searchkeys')">清空</el-button>
				</div>
			</el-col>
    	</el-row>
	</div> -->

    <div class="tool">
    	<router-link to="index"><el-button size="small">返回角色管理</el-button></router-link>
    </div>


    <table class="el-table el-table--border border-RB-none" cellspacing="0" cellpadding="0" border="0">
    <tr>
    	<th width="14%" class="is-leaf"><div class="cell">系统</div></th>
    	<th width="14%" class="is-leaf"><div class="cell">模块</div></th>
    	<th width="14%" class="is-leaf"><div class="cell">页面</div></th>
    	<th width="58%" class="is-leaf"><div class="cell">权限</div></th>
    </tr>
    <tr v-for="(item , index) in dataList">
	    <td  :rowspan="item.Fsystem_idSpan" :class="{hidden: item.Fsystem_idDis}"><div class="cell">{{item.Fsystem_name}}</div></td>
	    <td  :rowspan="item.Fmodule_idSpan" :class="{hidden: item.Fmodule_idDis}"><div class="cell">{{item.Fmodule_name}}</div></td>
	    <td  :rowspan="item.FpidSpan" :class="{hidden: item.FpidDis}">
	    	<div class="cell textRight">{{item.Fpage_name}} &nbsp;&nbsp;<el-checkbox @change="changeAuth(index)" v-model="item.haveAuth"></el-checkbox></div>
	    </td>
	    <td>
	    	<div class="cell">
	    		<span v-for="option in item.FauthList">
	    			<el-checkbox @change="setPageChoosed(index)" :disabled="option.authName=='查看'" v-model="option.isChecked">{{option.authName}}</el-checkbox>
	    		</span>
	    	</div>
	    </td>
	</tr>
    </table>
    <div class='submitRight'>
        <el-button type="primary" @click="submitnow()">确认</el-button>
        <router-link to="index"><el-button>取消</el-button></router-link>
    </div>
	
</div>
</template>

<style type="text/css" scoped="scoped">
.textRight{text-align: right;}
.textRight .el-checkbox{margin-right: 0}
.hidden{display: none;}
.content-rowspan div{
    padding-left: 18px;
    margin:auto -18px;
    line-height: 46px;
    border-bottom: 1px solid #ECEDEE
}
.content-rowspan div:last-child {
    border-bottom: 0
}
</style>

<script>
import api from '../../api/api'
import util from '../../common/util'
export default {
	data() {
	    return {
	    	strUserId:'',
	    	dataList:[],
	    	systemList:[],
	    	moduleList:{
	    		Search:[]
	    	},
        	searchkeys:{
        		"s_system_id":'',
		        "s_module_id":"",
		        "s_page_name":"",
		        "s_is_flags":"",
		        "s_auth_name":"",
		        "s_status":""
        	},
        	getSearchModule:{
        		"s_system_id":'',
				"s_module_name":'',
				'pageIndex':'0',
				'pageSize':'9999'
        	}
	    }
	},
	watch: {
        'searchkeys.s_system_id': function(val, oldVal) {
            this.searchkeys.s_module_id = ''
            this.moduleList.Search = []
            this.getSystemModules(val , 'Search')
        }
    },
	mounted() {
		this.getId()
		this.showList()
		// this.loadInfo()
	},
	methods:{
		getId:function(){
            this.strUserId= this.$route.query.id
        },
	    loadInfo:function(){
	    	let data = {'pageSize':'100'}
	    	api.getSystemList(data).then(res =>{
	    		if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.systemList = res.data.list
                
	    	})
	    },
	    getSystemModules:function(val , searchOrHandle , change){
	    	this['get'+searchOrHandle+'Module'].s_system_id = val
	    	if(searchOrHandle == 'Edit') this.getEditPages.s_system_id = val
	    	api.getModuleList(this['get'+searchOrHandle+'Module']).then(res => {
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.moduleList[searchOrHandle] = this.handleModuleList(res.data.list)
                if(!change && searchOrHandle== 'Edit') this.getEditPages.s_module_id = this.EditInfo.Fmodule_id
			})
	    },
	    handleModuleList:function(list){
	    	let arr = []
	    	for(var m in list){
	    		let modules = list[m].system_module_list
	    		for(var n in modules ){
	    			arr.push(modules[n])
	    		}
	    	}
	    	return arr
	    },
		showList:function(){
			
			let data = {
		        "s_system_id":this.searchkeys.s_system_id,
				"s_module_id":this.searchkeys.s_module_id,
				"s_page_name":this.searchkeys.s_page_name
			}
			api.getRoleAuth({s_role_id:this.strUserId}).then(res =>{
	    		if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.dataList = util.combineCell( this.gatherPageAuth(res.data.auth_list) )
	    	})
		},
		gatherPageAuth:function(list){
			let gatherList = {}
			let returnList = []
			for(var i in list){
				if(!gatherList['F'+list[i].Fpid]) {
					let data = {
						'Fsystem_id':list[i].Fsystem_id,
						'Fsystem_name':list[i].Fsystem_name,
						'Fmodule_id':list[i].Fmodule_id,
						'Fmodule_name':list[i].Fmodule_name,
						'Fpid':list[i].Fpid,
						'Fpage_name':list[i].Fpage_name,
						'haveAuth':list[i].is_check == '1'?true:false,
						'FauthList':[{
							'authName':list[i].Fname,
							'authId':list[i].Fauthority_id,
							'isChecked':list[i].is_check == '1'?true:false
						}]
					}
					gatherList['F'+list[i].Fpid] = data
				}else{
					gatherList['F'+list[i].Fpid].FauthList.push({
						'authName':list[i].Fname,
						'authId':list[i].Fauthority_id,
						'isChecked':list[i].is_check == '1'?true:false
					})
					if(list[i].is_check == '1') gatherList['F'+list[i].Fpid].haveAuth = true
				}
			}
			for(var key in gatherList){
				returnList.push(gatherList[key])
			}
			return returnList
		},
		//search
		search:function(){
			this.showList()
		},
		clearForm(){
			this.searchkeys.s_system_id = ''
			this.searchkeys.s_module_id = ''
			this.searchkeys.s_page_name = ''
			this.showList()
		},
		/*****   *****/ 
		submitnow:function(){
            api.editRoleAuths(this.handleSubmitData(this.dataList)).then(res => {
                if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.$layer.msg('成功！')
                this.$router.push({ path: 'index' })
            })
		},
		changeAuth:function(index){
			var authList = this.dataList[index].FauthList
			if(this.dataList[index].haveAuth){
				for(var i in authList){
					authList[i].isChecked = true
				}
			}else{
				for(var i in authList){
					authList[i].isChecked = false
				}
			}
		},
		setPageChoosed:function(index){
			if(this.dataList[index].haveAuth) return
			var authList = this.dataList[index].FauthList
			for(var i in authList){
				if(authList[i].isChecked) {
					this.dataList[index].haveAuth = true
					for(var n in authList){
						if(authList[n].authName == '查看') authList[n].isChecked = true
					}
					return
				}
			}
		},

		handleSubmitData:function(list){
			let subList = {
				"e_role_id":this.strUserId,
				"e_add_datas":[],
				"e_del_datas":[]
			}
			for(var i in list){
				var authList = list[i].FauthList
				for(var n in authList){
					if(authList[n].isChecked) subList.e_add_datas.push({"e_system_id":list[i].Fsystem_id , "e_auth_id":authList[n].authId})
					else subList.e_del_datas.push({"e_system_id":list[i].Fsystem_id , "e_auth_id":authList[n].authId})
				}
			}
			return subList
		}
	}


}
</script>
<style type="text/css">
	.pagination{text-align: right;margin: 20px 0}
	.tool{text-align: right;margin-bottom: 20px;}
</style>