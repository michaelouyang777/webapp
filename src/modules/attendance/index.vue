<template>
  <div class="content">
    <!--list-->
    <section class="hy_list_container">
      <div class="hylist_container">
        <ul>
          <li class="hy_li" @click="clickItem(item.id)" v-for="(item,index) in list">
          	<mt-cell-swipe class="wrap" :right="[{
					      content: '删除',
					      style: { background: 'red', color: '#fff'},
					      handler: () => delItem(item.id,index)
						  }]" title="类别">
	            <hgroup class="shop_right">
	              <header class="shop_detail_header">
	                <h4 class="shop_title ellipsis">{{item.title}}</h4>
	              </header>
	              <h5 class="fee_distance">
	                <section class="fee">
	                  	姓名：{{item.name}}
	                  	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	               		 提交人：{{item.agreed}}
	                </section>
	              </h5>
	              <h5 class="fee_distance">
	              	<section class="fee">
	                  	请假类别：{{item.type}}
	                </section>
	              </h5>
	              <h5 class="fee_distance fee_m">
		            	<div class="row">
		            		<div class="col-xs-6 fee">{{item.startDate}}</div>
		            		<div class="col-xs-6 fee">{{item.endDate}}</div>
		            	</div>
	              </h5>
	            </hgroup>
            </mt-cell-swipe>
          </li>
        </ul>
      </div>
    </section>
   	<div class="add" @click="addItem()">+</div>
  </div>
</template>

<script>
	import { getPage4Attendance, deleteAttendance } from '../../service/attendance'
	import { Toast, Indicator } from 'mint-ui';
	export default {
		data() {
			return {
//				listSetting: ,
				list: []
			}
		},
		mounted() {
			this.$root.$emit.apply(this.$root, ['change-header'].concat(["请休假管理", true, true]));
			this.openList();
		},
		methods: {
			openList(){
				//获取列表——外出
				getPage4Attendance().then((value) => {
					Indicator.close();
					this.list = value;
				});
			},
			clickItem(id) {
				this.$router.push('/attendance/' + id);
			},
			addItem(){
				this.$router.push('/attendance/add');
			},
			delItem(id,index){
				console.log(id +"+"+index)
				//删除一项
				deleteAttendance(id).then(value => {
					Indicator.close();
				})
				const list = this.list;
				for(let i=0; list.length>i; i++){
					console.log(i)
					if(index == i){
						list.splice(i,1);
					}
				}
			}
		}
		
	}
</script>

<style lang="stylus" scoped>
  .content
    padding-top: 2rem;
    width 100%
    height 100%
    .hy_list_container
      .hylist_container
        background-color: #fff;
        padding-bottom: 2rem;
      .hy_li
        border-bottom: .025rem solid #e2e2e2;
        /*padding: 0.5rem 0;*/
        .shop_right
          margin-left: 0.4rem;
          .shop_detail_header
            .shop_title
              padding-top: .8rem;
              width: 12rem;
              color: #333;
              font: .65rem/.65rem PingFangSC-Regular;
              font-weight: 700;
              .ellipsis
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
          .fee_distance
            margin-top: .6rem;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            font-size: .5rem;
            color: #666;
            .fee
              font-size: .5rem;
              color: #666;
              span
                color: #999;
              .segmentation
                color: #ccc;
              .order_time
                color: #3190e8;
          .fee_m
            margin-bottom .8rem
    .add
      font-size: 2rem
      background: #3190e8
      color: #fff
      height: 2rem
      width: 2rem
      line-height: 2rem
      text-align: center
      border-radius: 50%
      position: absolute
      right: 1rem
      bottom: 1rem
</style>
