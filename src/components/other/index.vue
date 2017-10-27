<template>
<div>
	<div class="title">角色列表</div>
	<!--工具条-->
	<div style='overflow:hidden'>
		<div class="searchItem">
			<span class="searchTitle">分类：</span>
			<el-select v-model="searchkeys.cateId" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in cateRoleList" :label="item.Fname" :value="item.Fcate_id" :key="item.Fcate_id"></el-option>
            </el-select>
		</div>
		<div class="searchItem">
			<span class="searchTitle">角色：</span>
			<el-input v-model="searchkeys.roleName" :maxlength='20' placeholder="请输入角色名"></el-input>
		</div>
		<div class="goSearch">
			<el-button @click="search">搜索</el-button>
      		<el-button @click="clearForm('searchkeys')">清空</el-button>
		</div>
	</div>

    <div class="tool">
    	<router-link to="category"><el-button size="small">分类管理</el-button></router-link>
    	<el-button type="primary" size="small" @click="addRole()">创建角色</el-button>
    </div>

	<el-table
	    :data="dataList"
	    border
	    style="width: 100% ; min-height:300px">
	    <el-table-column prop="Frole_id" label="ID"></el-table-column>
	    <el-table-column prop="Fname" label="角色名称" ></el-table-column>
	    <el-table-column prop="Fdesc" label="角色描述" ></el-table-column>
	    <el-table-column prop="Fcate_name" label="所属分类"></el-table-column>
	    <el-table-column  label="状态" >
	    	<template scope="scope">
	    		<span v-if="scope.row.upStatus">上级被禁用，当前无法操作</span>
	    		<span v-else-if="scope.row.Fstatus == '1' ">启用</span>
	    		<span v-else>禁用</span>
	        </template>
	    </el-table-column>
	    <el-table-column label="操作" >
	        <template scope="scope" >
	        	<div v-if="scope.row.Fstatus == 1">
		        	<el-button class='indexFunBtn' type="primary" @click="getEditData(scope.$index)"  size="small">编辑</el-button>
		        	<el-button class='indexFunBtn' type="primary" @click="setPower(scope.row.Frole_id)"  size="small">设置权限</el-button>
		        	<el-button class='indexFunBtn' type="danger" @click="setStatusConfirm(scope.row.Frole_id , scope.row.Fstatus)"  size="small">禁用</el-button>
	        	</div>
	        	<div v-else>
	        		<el-button  type="primary" @click="setStatusConfirm(scope.row.Frole_id , scope.row.Fstatus)" :disabled="scope.row.upStatus" size="small">启用</el-button>
	        	</div>
	        </template>
	    </el-table-column>
	</el-table>
	<div class="pagination">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30, 40]"
	      :page-size="10"
	      layout="total, prev, pager, next, jumper"
	      :total="total">
	    </el-pagination>
	</div>
	<!-- 新增 -->
	<el-dialog title="新增" :visible.sync="addDialog">
        <el-form  :model="handelAddRole" :rules="rules" ref="handelAddRole" label-width="100px">
            <el-form-item label="所属分类：" filterable prop='c_cate_id'>
                <el-select v-model="handelAddRole.c_cate_id" placeholder="请选择">
	                <el-option v-for="item in enableCateRoleList" :label="item.Fname" :value="String(item.Fcate_id)" :key="item.Fcate_id"></el-option>
	            </el-select>
            </el-form-item>
            <el-form-item label="角色名称："  prop='c_name'>
                <el-input v-model="handelAddRole.c_name"  :maxlength='50' placeholder='请输入角色名称'></el-input>
            </el-form-item>
            <el-form-item label="描述："  prop='c_desc'>
                <el-input v-model="handelAddRole.c_desc" :maxlength='100'  placeholder='请输入角色描述'></el-input>
            </el-form-item>
            <el-form-item class='submitRight'>
                <el-button type="primary" @click="submitnow('handelAddRole')">确认</el-button>
                <el-button @click="cancelnow">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 编辑 -->
	<el-dialog title="编辑" :visible.sync="editDialog">
        <el-form  :model="handelEditRole" :rules="rules" ref="handelEditRole" label-width="100px">
            <el-form-item label="所属分类：" filterable prop='e_cate_id'>
                <el-select v-model="handelEditRole.e_cate_id" placeholder="请选择">
	                <el-option v-for="item in cateRoleList" :label="item.Fname" :value="String(item.Fcate_id)" :key="item.Fcate_id"></el-option>
	            </el-select>
            </el-form-item>
            <el-form-item label="角色名称："  prop='e_name'>
                <el-input v-model="handelEditRole.e_name"  :maxlength='50' placeholder='请输入角色名称'></el-input>
            </el-form-item>
            <el-form-item label="描述："  prop='e_desc'>
                <el-input v-model="handelEditRole.e_desc" :maxlength='100'  placeholder='请输入角色描述'></el-input>
            </el-form-item>
            <el-form-item class='submitRight'>
                <el-button type="primary" @click="submitnow('handelEditRole')">确认</el-button>
                <el-button @click="cancelnow">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>
	

<script>
import api from '../../api/api'
import util from '../../common/util'
export default {
	data() {
		var validateName = (rule, value, callback) => {
            value = util.Trim(value)
            let len = value.gblen()
            if( len < 1|| len >50){
                callback(new Error('请输入50个以内字符'))
            }else if( util.checkSpecialWord(value)){
                callback(new Error('不能包含特殊字符'))
            }
            callback()
        }
        var validateDesc = (rule, value, callback) => {
            value = util.Trim(value)
            let len = value.gblen()
            if( len < 1|| len >100){
                callback(new Error('请输入100个以内字符'))
            }
            callback()
        }
	    return {
	    	addDialog:false,
	    	editDialog:false,
	    	dataList:[],
	    	cateRoleList:[],
	    	enableCateRoleList:[],
	    	pageIndex:'0',
        	pageSize:'10',
        	currentPage:1,
        	total:0,
        	searchkeys:{
        		"cateId":'',
		        "roleName":""
        	},
        	handelAddRole:{
        		c_cate_id:'',
        		c_name:'',
        		c_desc:'',
        		c_status:'1',
        	},
        	handelEditRole:{
        		'e_name' : '',
    			'e_desc' : '',
    			'e_status' : '1',
    			'e_role_id' : '',
    			'e_cate_id' : ''
        	},
        	rules:{
        		c_cate_id: [{  required: true,  message: '请选择所属分类'}],
                c_name: [{  required: true , validator: validateName, trigger: 'blur' }],
                c_desc: [{ required: true , validator: validateDesc, trigger: 'blur' }],

                e_cate_id: [{  required: true,  message: '请选择所属分类'}],
                e_name: [{  required: true , validator: validateName, trigger: 'blur' }],
                e_desc: [{ required: true , validator: validateDesc, trigger: 'blur' }]
            }
	    }
	},
	mounted()  {
		this.showList()
		this.loadInfo()
	},
	methods:{
		handleSizeChange(val) {
	        console.log(`每页 ${val} 条`)
	    },
	    handleCurrentChange(val) {
	    	this.pageIndex = (val- 1)
	        this.showList()
	    },
	    //关联上级状态 如上层为禁用，下层全为禁用
	    relateFstatus:function(list){
	    	for(var i in list){
	    		if(list[i].cr_status != '1') list[i].Fstatus = '2',list[i].upStatus = true
	    	}
	    	return list
	    },
	    getEnableList:function(list){
	    	let Lists = []
	    	for(var i in list){
	    		if(list[i].Fstatus == '1') Lists.push(list[i])
	    	}
	    	return Lists
	    },
	    loadInfo:function(){
	    	let data = {}
	    	api.getCateRoleList(data).then(res =>{
	    		if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.cateRoleList = res.data.list
                this.enableCateRoleList = this.getEnableList(res.data.list)
	    	})
	    },
		showList:function(){
			this.searchkeys.roleName = util.Trim(this.searchkeys.roleName)
			let data = {
		        "s_cate_id": this.searchkeys.cateId,
				"s_role_name":this.searchkeys.roleName,
				'pageIndex':String(this.pageIndex),
				'pageSize':this.pageSize
			}
			api.getRoleList(data).then(res => {
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.dataList = this.relateFstatus(res.data.list)
				this.total = Number(res.data.nums)
			})
		},
		//设置状态
		setStatus:function(id , status){
			let data = {
				"s_role_id":id,
        		"s_status": status == '1'?'2':'1'
			}
			api.changeRoleStatus(data).then(res => {
                if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.$layer.msg('成功！')
                this.showList()
            })
		},
		//新增
		addRole:function(){
			// this.handelAddRole.c_cate_id = ''
			this.handelAddRole.c_name = ''
			this.handelAddRole.c_desc = ''
			this.handelAddRole.c_role_id = ''
			this.addDialog = true
		},
		//编辑
		getEditData:function(index){
			let roleInfo = this.dataList[index]
			this.handelEditRole.e_cate_id = String(roleInfo.Fcate_id)
			this.handelEditRole.e_name = roleInfo.Fname
			this.handelEditRole.e_desc = roleInfo.Fdesc
			this.handelEditRole.e_role_id = roleInfo.Frole_id
            this.editDialog = true
            
		},
		
		//设置权限
		setPower:function(id){
			this.$router.push({
				name:'setPower',
				query:{id:id}
			})
		},
		
		//search
		search:function(){
			this.pageIndex = '0'
			this.showList()
		},
		clearForm(){
			this.searchkeys.cateId = ''
			this.searchkeys.roleName = ''
			this.showList()
		},
		/*****  新增/编辑  *****/ 
		submitnow:function(formName){
			if(this.addDialog){
				this.handelAddRole.c_name = util.Trim(this.handelAddRole.c_name)
				this.handelAddRole.c_desc = util.Trim(this.handelAddRole.c_desc)
				
	            this.$refs[formName].validate((valid) => { 
	                if (valid) {
	                    api.addRole(this.handelAddRole).then(res => {
	                        if (res.ret != '0') {
	                            this.$layer.msg(res.retinfo)
	                            return
	                        }
	                        this.$layer.msg('成功！')
	                        this.showList()
	                        this.addDialog = false
	                    })
	                } else {
	                    console.log('error submit!!')
	                    return false;
	                }
	            })

			}else{
				this.handelEditRole.e_name = util.Trim(this.handelEditRole.e_name)
				this.handelEditRole.e_desc = util.Trim(this.handelEditRole.e_desc)
            	api.editRole(this.handelEditRole).then(res => {
	                if (res.ret != '0') {
	                    this.$layer.msg(res.retinfo)
	                    return
	                }
	                this.$layer.msg('成功！')
                    this.showList()
                    this.editDialog = false
	            })
			}
		},
		setStatusConfirm:function(id , status){
			let warnInfo = {
				title  : status == '1'?'禁用':'启用'
			}
			const h = this.$createElement
			if(status == '1'){
                warnInfo.content = h('div',null,[
                        h('p',{style:'margin-bottom:6px'},'禁用后：'),
                        h('p',{style:'color:#ff4949'},'• 该角色无法登录相关应用'),
                        h('p',{style:'margin-top:6px'},'请谨慎操作！')
                    ])
            }else{
                warnInfo.content = h('div',null,[
                        h('p',{style:'margin-bottom:6px'},'启用后：'),
                        h('p',{style:'color:#ff4949'},'• 该角色将恢复使用请谨慎操作！'),
                        h('p',{style:'margin-top:6px'},'请谨慎操作！')
                    ])
            }
	        this.$confirm(warnInfo.content, warnInfo.title, {
	          //type: 'warning'`
	        }).then(() => {
	        	this.setStatus(id , status)
	        }).catch(() => {})
      	},
		cancelnow:function(id){
			this.addDialog = false
			this.editDialog = false
		}
	}


}
</script>
<style type="text/css">
	.pagination{text-align: right;margin: 20px 0}
	.tool{text-align: right;margin-bottom: 20px;}
</style>