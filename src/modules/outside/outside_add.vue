<template>
	<div class="outside_add">
		<div>
			<div class="title">
				<span class="text">基础信息</span>
				<span class="sendBtn" @click="submit()">提 交</span>
			</div>
			<mt-field label="项目" placeholder="请填写内容" v-model="formData.title"></mt-field>
			<mt-field label="派遣人" placeholder="请填写内容" v-model="formData.creater"></mt-field>
			<mt-field label="访问客户" placeholder="请填写内容" v-model="formData.client"></mt-field>
			
			<div class="rootDatePicker">
				<mt-field label="起始时间"></mt-field>
				<span class="picker" @click="openStartPicker">{{startTime}}</span>
				<mt-datetime-picker ref="startpicker" type="date" v-model="startpicker" @confirm="confirmStartDate"></mt-datetime-picker>
			</div>
			
			<div class="rootDatePicker">
				<mt-field label="结束时间"></mt-field>
				<span class="picker" @click="openEndPicker">{{endTime}}</span>
				<mt-datetime-picker ref="endpicker" type="date" v-model="endpicker" @confirm="confirmEndDate"></mt-datetime-picker>
			</div>
			
			<mt-field label="外出事项" placeholder="请填写内容" v-model="formData.content" type="textarea" rows="4"></mt-field>
		</div>
			
		
		<div class="content_file">
			<div class="title">
				<span class="text">附件</span>
				<span class="temp add" @click="addFile()">+</span>
				<span class="temp reduce" @click="reduceFile()">-</span>
			</div>
			
			
		</div>
	</div>
</template>

<script>
	import { submitOutside } from '../../service/outside'
	import { Toast, Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				startTime: "请选择时间",
				endTime: "请选择时间",
				startpicker: '',
				endpicker: '',
				formData: {
					title: '',
					creater: '',
					client: '',
					startDate: '',
					endDate: '',
					content: ''
				},
				//存放选项
				value:[],
				//checklist设置
				options : []
//				options : ['xxx.doc','xxx.xml']
			}
		},
		mounted() {
			this.$root.$emit.apply(this.$root, ['change-header'].concat(["新增外出管理", true, true]));
		},
		methods:{
			addFile(){
				Toast("待开发")
				console.log("添加附件")
				//调用插件获取系统内的file
				//TODO
			},
			reduceFile(){
				console.log("减少附件")
				const chooseValue = this.value,
					option = this.options;
				for(let i=0; option.length>i; i++){				//所有选项
					for(let j=0; chooseValue.length>j; j++){	//所选选项
						if(chooseValue[j] == option[i]){		//所选的=选项的
							chooseValue.splice(j,1);
							option.splice(i,1);
						}
					}
				}
			},
			submit(){
				const formData = this.formData;
				if(formData.title==''){
					Toast("请填写项目内容");
					return;
				}
				if(formData.creater==''){
					Toast("请填写派遣人");
					return;
				}
				if(formData.client==''){
					Toast("请填写访问客户");
					return;
				}
				if(formData.content==''){
					Toast("请填写外出事项");
					return;
				}
				if(formData.startDate==''){
					Toast("请选择起始时间");
					return;
				}
				if(formData.endDate==''){
					Toast("请选择结束时间");
					return;
				}
				const startDate = formData.startDate.replace(/-/g,'/'),
					endDate = formData.endDate.replace(/-/g,'/');
				if(startDate>endDate){
					Toast("结束时间必须大于等于开始时间");
					return;
				}
				
				
				let fileData = {};//TODO
				const data= Object.assign(fileData,this.formData);
				console.log(data)
				//提交表单
				submitOutside(data).then((value) => {
					Indicator.close();
					Toast("提交成功");
					this.$router.go(-1);
				});
			},
			openStartPicker() {
		        this.$refs.startpicker.open();
		    },
		    confirmStartDate(v){
		   		const date = v.getFullYear()+"-"+(v.getMonth()+1)+"-"+v.getDate();
		   		this.startTime = this.formData.startDate = date;
		    },
		    openEndPicker() {
		        this.$refs.endpicker.open();
		    },
		    confirmEndDate(d){
		   		const date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		   		this.endTime = this.formData.endDate = date;
		    }
		}
	}
</script>

<style lang="stylus" scoped>
  .outside_add
      .rootDatePicker
        position: relative
        .picker
          position: absolute
          top: .5rem
          left: 5.75rem
          display: inline-block
          width:9.75rem
          color: #757575
          text-align: right
      .title
        background: #e5e5e5
        height: 2rem
        line-height: 2rem
        padding-left: .5rem
        position: relative
        .text
          font-size: 1rem
        .temp
          font-size: 1rem
          display: inline-block
          width: 1rem
          height: 1rem
          text-align: center
          border-radius: 50%
          color: #fff
          position: absolute
          top: .5rem
        .add
          line-height: 1rem
          right: 1rem
          background: #09bb07
        .reduce
          line-height: 1rem
          right: 3rem
          background: #e64340
        .sendBtn
          font-size: .6rem
          display: inline-block
          width: 2.5rem
          height: 1.2rem
          text-align: center
          border-radius: 5px
          color: #fff
          position: absolute
          top: .4rem
          right: .5rem
          line-height: 1.2rem
          background: #09bb07
      .panel-body
      	padding: 0
</style>
