<template>
<div>
    <div class="title">系统管理</div>

    <div class="tool">
        <el-button type="primary" size="small" @click="addSystem()">新增系统</el-button>
    </div>

    <el-table
        :data="dataList"
        border
        style="width: 100% ; min-height:300px">
        <el-table-column prop="system_id" label="ID" ></el-table-column>
        <el-table-column prop="name" label="系统名称" ></el-table-column>
        <el-table-column prop="system_desc" label="系统描述" ></el-table-column>
        <el-table-column  label="状态" >
            <template scope="scope">
                <span v-if="scope.row.status == '1' ">启用</span>
                <span v-else-if="scope.row.status == '2' ">禁用</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" >
            <template scope="scope" >
                <div v-if="scope.row.status == 1">
                    <el-button class='indexFunBtn' type="primary" @click="getEditData(scope.$index)"  size="small">编辑</el-button>
                    <el-button class='indexFunBtn' type="danger" @click="setStatusConfirm(scope.row.system_id , scope.row.status)"  size="small">禁用</el-button>
                </div>
                <div v-else>
                    <el-button class='indexFunBtn'  type="primary" @click="setStatusConfirm(scope.row.system_id , scope.row.status)"  size="small">启用</el-button>
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
        <el-form  :model="handelAddSystem" :rules="rules" ref="handelAddSystem" label-width="100px">
            <el-form-item label="系统名称："  prop='c_system_name'>
                <el-input v-model="handelAddSystem.c_system_name" :maxlength='40'  placeholder='请输入系统名称'></el-input>
            </el-form-item>
            <el-form-item label="描述："  prop='c_system_desc'>
                <el-input type="textarea" :rows="3" v-model="handelAddSystem.c_system_desc" :maxlength='100' placeholder='请输入系统描述'></el-input>
            </el-form-item>
            <el-form-item class='submitRight'>
                <el-button type="primary" @click="submitnow('handelAddSystem')">确认</el-button>
                <el-button @click="cancelnow">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editDialog">
        <el-form  :model="handelEditSystem" :rules="rules" ref="handelEditSystem" label-width="100px">
            <el-form-item label="系统名称："  prop='e_system_name'>
                <el-input v-model="handelEditSystem.e_system_name" :maxlength='40'  placeholder='请输入系统名称'></el-input>
            </el-form-item>
            <el-form-item label="描述："  prop='e_system_desc'>
                <el-input type="textarea" :rows="3" v-model="handelEditSystem.e_system_desc" :maxlength='100' placeholder='请输入系统描述'></el-input>
            </el-form-item>
            <el-form-item class='submitRight'>
                <el-button type="primary" @click="submitnow('handelEditSystem')">确认</el-button>
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
            if( len < 1|| len >40){
                callback(new Error('请输入40个以内字符'))
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
            pageIndex:'0',
            pageSize:'10',
            currentPage:1,
            total:0,
            searchkeys:{
                "cateId":'',
                "roleName":""
            },
            handelAddSystem:{
                c_system_name:'',
                c_system_desc:'',
                c_status:'1',
                c_system_url:'',
            },
            handelEditSystem:{
                e_system_name:'',
                e_system_desc:'',
                e_status:'1',
                e_system_url:'',
            },
            rules:{
                c_system_name: [{  required: true , validator: validateName, trigger: 'blur' }],
                c_system_desc: [{ required: true , validator: validateDesc, trigger: 'blur' }],

                e_system_name: [{  required: true , validator: validateName, trigger: 'blur' }],
                e_system_desc: [{ required: true , validator: validateDesc, trigger: 'blur' }]
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
        
        loadInfo:function(){
            
        },
        showList:function(){
            
            let data = {
                'pageIndex':String(this.pageIndex),
                'pageSize':this.pageSize
            }
            api.getSystemList(data).then(res => {
                if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }

                let List = res.data.list
                
                this.dataList = List

                this.total = Number(res.data.nums)
            })
        },
        //设置状态
        setStatus:function(id , status){
            let data = {
                "e_system_id":id,
                "e_status": status == '1'?'2':'1'
            }
            api.changeSystemStatus(data).then(res => {
                if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.$layer.msg('成功！')
                this.showList()
            })
        },
        //新增
        addSystem:function(){
            this.handelAddSystem.c_system_id = ''
            this.handelAddSystem.c_system_name = ''
            this.handelAddSystem.c_system_desc = ''
            this.addDialog = true
        },
        //编辑
        getEditData:function(index){
            let roleCateInfo = this.dataList[index]
            this.handelEditSystem.e_system_id = roleCateInfo.system_id
            this.handelEditSystem.e_system_name = roleCateInfo.name
            this.handelEditSystem.e_system_desc = roleCateInfo.system_desc
            this.editDialog = true
            
        },
        //search
        search:function(){
            this.showList()
        },
        /*****  新增/编辑  *****/ 
        submitnow:function(formName){
            if(this.addDialog){
                this.handelAddSystem.c_name = util.Trim(this.handelAddSystem.c_name)
                this.handelAddSystem.c_desc = util.Trim(this.handelAddSystem.c_desc)
                
                this.$refs[formName].validate((valid) => { 
                    if (valid) {
                        api.addSystem(this.handelAddSystem).then(res => {
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
                this.handelEditSystem.e_name = util.Trim(this.handelEditSystem.e_name)
                this.handelEditSystem.e_desc = util.Trim(this.handelEditSystem.e_desc)

                this.$refs[formName].validate((valid) => { 
                    if (valid) {
                        api.editSystem(this.handelEditSystem).then(res => {
                            if (res.ret != '0') {
                                this.$layer.msg(res.retinfo)
                                return
                            }
                            this.$layer.msg('成功！')
                            this.showList()
                            this.editDialog = false
                        })
                    } else {
                        console.log('error submit!!')
                        return false;
                    }
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
                        h('p',{style:'color:#ff4949'},'• 该系统中所有内容将被禁用'),
                        h('p',{style:'color:#ff4949'},'• 将无法往该系统中新增内容'),
                        h('p',{style:'margin-top:6px'},'请谨慎操作！')
                    ])
            }else{
                warnInfo.content = h('div',null,[
                        h('p',{style:'margin-bottom:6px'},'禁用后：'),
                        h('p',{style:'color:#ff4949'},'• 该系统中的内容将恢复至禁用前的状态'),
                        h('p',{style:'margin-top:6px'},'请谨慎操作！')
                    ])
            }
            this.$confirm(warnInfo.content, warnInfo.title, {
              //type: 'warning'
            }).then(() => {
                this.setStatus(id , status)
            }).catch(() => {})
        },
        cancelnow:function(id){
            this.editDialog = false
            this.addDialog = false
        },
    }


}
</script>
<style type="text/css">
    .pagination{text-align: right;margin: 20px 0}
    .tool{text-align: right;margin-bottom: 20px;}
</style>