<template>
	<div class="outside_info">
		<div class="panel no-radius">
			<div class="panel-body body">
				<div class="title">
					{{notice.title}}
				</div>
				<div class="info">
					<div class="row">
						<div class="col-xs-6">
							派遣人：{{notice.creater}}
						</div>
						<div class="col-xs-6">
							访问客户：{{notice.client}}
						</div>
					</div>
				</div>
				<div class="info">
					<div class="row">
						<div class="col-xs-12">
							起始时间：{{notice.startDate}}
						</div>
					</div>
				</div>
				<div class="info">
					<div class="row">
						<div class="col-xs-12">
							结束时间：{{notice.endDate}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<ul style="border-radius:0px;box-shadow:none">
				<li class="list-group-item" style="border-right:0;border-left:0;border-bottom: 0; font-weight:700;">
					外出事项
				</li>
			</ul>
			<div class="panel-body" style="padding-top:0">
				{{notice.content}}
			</div>
		</div>
		
		<div>
			<ul style="border-radius:0px;box-shadow:none">
				<li class="list-group-item" style="border-right:0;border-left:0;border-bottom: 0;font-weight:700;">
					附件
				</li>
			</ul>
			<div class="panel-body" style="padding:0px;">
				<ul class="list-group">
					<template v-for="(result, index) in notice.file">
						<li class="list-item" v-if="(index+1) == 0" style="border-right:0px;border-left:0px;border-top: 0px;">
							没有附件
						</li>
						<li class="list-item" v-else="(index+1) > 0" style="border-right:0px;border-left:0px;">
							{{result.fileName}}
						</li>
					</template>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import { openOutside } from '../../service/outside'
	import { Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				id: this.$router.currentRoute.params.id,
				notice: {}
			}
		},
		mounted() {
			this.$root.$emit.apply(this.$root, ['change-header'].concat(["外出管理详情", true, true]));
			openOutside(this.id).then(value => {
				Indicator.close();
				this.notice = value;
			});
		}
	}
</script>

<style lang="stylus" scoped>
  .outside_info
    position absolute
    top 0rem
    bottom 2rem
    width 100%
    .no-radius
      border-radius 0px
      margin-bottom 0px
    .body
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .title
        font-weight 700
      .info
        margin-top: .5rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        font-size: .5rem;
        color: #666;
    .confrim_order
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 4rem;
      .info
        background-color: #3c3c3c;
        -webkit-box-flex: 5;
        -ms-flex: 5;
        flex: 5;
        padding-left: .7rem;
        line-height: 4rem;
        font-size: 1.4rem;
        color: #fff;
      .confrim
        -webkit-box-flex: 2;
        -ms-flex: 2;
        flex: 2;
        background-color: #56d176;
        text-align: center;
        line-height: 4rem;
        font-size: 1.4rem;
        color: #fff;
    .list-item {
	  position: relative;
	  display: block;
	  padding: 10px 15px;
	  margin: 0 15px;
	  margin-bottom: -1px;
	  background-color: #fff;
	  border: 1px solid #ddd;
	}
</style>
