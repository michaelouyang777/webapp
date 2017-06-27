<template>
	<div class="attendance_add">
		<div>
			<div class="title">
				<span class="text">基础信息</span>
				<span class="sendBtn" @click="submit()">提 交</span>
			</div>
			
			<form class="form-base">
				<div class="flex form-mb" >
					<div class="form-left">姓名</div>
					<div class="felx-1 form-right"><input name="name" type="text" placeholder="请填写内容" v-model="formData.name"/></div>
	            </div>
				<div class="flex form-mb">
					<div class="form-left">请假类别</div>
					<div class="felx-1 form-right">
						<mt-picker :slots="slots" @change="onTypeChange" :visible-item-count="1"></mt-picker>
					</div>
				</div>
				
				<div class="flex form-mb">
					<div class="form-left">起始时间</div>
					<div class="felx-1 form-right">
						<span class="picker" @click="openStartPicker">{{startTime}}</span>
						<mt-datetime-picker ref="startpicker" type="dateTime" v-model="startpicker" @confirm="confirmStartDate"></mt-datetime-picker>
					</div>
				</div>
				<div class="flex form-mb">
					<div class="form-left">结束时间</div>
					<div class="felx-1 form-right">
						<span class="picker" @click="openEndPicker">{{endTime}}</span>
						<mt-datetime-picker ref="endpicker" type="dateTime" v-model="endpicker" @confirm="confirmEndDate"></mt-datetime-picker>
					</div>
				</div>
				
				<div class="flex form-mb">
					<div class="form-left">请假天数</div>
					<div class="felx-1 form-right">
						<input name="days" type="text" placeholder="请填写天数" v-model="formData.days"/>
					</div>
				</div>
				<div class="flex">
					<div class="form-left">事项说明</div>
					<div class="felx-1 form-right-db">
						<textarea name="content" type="text" placeholder="请填写内容" rows="3" v-model="formData.content"/>
					</div>
				</div>
			</form>
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
	import { submitAttendance } from '../../service/attendance'
	import { Toast, Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				slots:[{values: ['事假','病假', '年假', '婚假', '其他'], flex:1}],
				startTime: "请选择时间",
				endTime: "请选择时间",
				startpicker: '',
				endpicker: '',
				formData: {
					name: '',		// 姓名
					type: '',		// 类别		
					days: '',		// 天数		
					startDate: '',	// 开始时间
					endDate: '',	// 结束时间
					content: ''		// 说明
				},
				//存放选项
				value:[],
				//checklist设置
				options : []
//				options : ['xxx.doc','xxx.xml']
			}
		},
		mounted() {
			this.$root.$emit.apply(this.$root, ['change-header'].concat(["新增请休假", true, true]));
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
				if(formData.name==''){
					Toast("请填写姓名");
					return;
				}
				if(formData.type==''){
					Toast("请选择请假类别");
					return;
				}
				if(formData.days==''){
					Toast("请填写请假天数");
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
//				if(startDate>endDate){
//					Toast("结束时间必须大于等于开始时间");
//					return;
//				}
				
				let fileData = {};//TODO
				const data= Object.assign(fileData,this.formData);
				console.log(data)
				//提交表单
				submitAttendance(data).then((value) => {
					Indicator.close();
					Toast("提交成功");
					this.$router.go(-1);
				});
			},
			onTypeChange(picker, values) {
				this.formData.type = values[0];
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
  @import '../../assets/css/form';
  .attendance_add
      .title
        background: #e5e5e5
        height: 2rem
        line-height: 2rem
        padding-left: .5rem
        position: relative
        .text
          font-size: 1rem
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
      .form-base
      	padding: 1rem
</style>
