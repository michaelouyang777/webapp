import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//主页
const Home = resolve => require.ensure([], () => resolve(require('../modules/home/index.vue')), 'home/index')
//登录
const Login = resolve => require.ensure([], () => resolve(require('../modules/login/index.vue')), 'login/index')
//会议
const Meeting = resolve => require.ensure([], () => resolve(require('../modules/meeting/index.vue')), 'meeting/index')
const MeetingInfo = resolve => require.ensure([], () => resolve(require('../modules/meeting/meeting_info.vue')), 'meeting/meeting_info')
const Meeting4my = resolve => require.ensure([], () => resolve(require('../modules/meeting/meeting4my.vue')), 'meeting/meeting4my')
const Meeting4djchy = resolve => require.ensure([], () => resolve(require('../modules/meeting/meeting4djchy.vue')), 'meeting/meeting4djchy')
const Meeting4dsyhy = resolve => require.ensure([], () => resolve(require('../modules/meeting/meeting4dsyhy.vue')), 'meeting/meeting4dsyhy')
//议题
const IssueInfo = resolve => require.ensure([], () => resolve(require('../modules/issue/issue_info.vue')), 'issue/issue_info')
const Issue = resolve => require.ensure([], () => resolve(require('../modules/issue/index.vue')), 'issue/index')
const Issue4ysh = resolve => require.ensure([], () => resolve(require('../modules/issue/issue4ysh.vue')), 'issue/issue4ysh')
const Issue4dsh = resolve => require.ensure([], () => resolve(require('../modules/issue/issue4dsh.vue')), 'issue/issue4dsh')
const Issue4spz = resolve => require.ensure([], () => resolve(require('../modules/issue/issue4spz.vue')), 'issue/issue4spz')
const Issue4zxz = resolve => require.ensure([], () => resolve(require('../modules/issue/issue4zxz.vue')), 'issue/issue4zxz')
//决策
const Decision = resolve => require.ensure([], () => resolve(require('../modules/decision/index.vue')), 'decision/index')
const DecisionInfo = resolve => require.ensure([], () => resolve(require('../modules/decision/decision_info.vue')), 'decision/decision_info')
const DecisionExe = resolve => require.ensure([], () => resolve(require('../modules/decision/decision4Exe.vue')), 'decision/decision4Exe')
const DecisionYjc = resolve => require.ensure([], () => resolve(require('../modules/decision/decision4Yjc.vue')), 'decision/decision4Yjc')
//外出管理
const Outside = resolve => require.ensure([], () => resolve(require('../modules/outside/index.vue')), 'outside/index')
const OutsideInfo = resolve => require.ensure([], () => resolve(require('../modules/outside/outside_info.vue')), 'outside/outside_info')
const OutsideAdd = resolve => require.ensure([], () => resolve(require('../modules/outside/outside_add.vue')), 'outside/outside_add')

//报销管理
const Receipt = resolve => require.ensure([], () => resolve(require('../modules/receipt/index.vue')), 'receipt/index')
const ReceiptInfo = resolve => require.ensure([], () => resolve(require('../modules/receipt/receipt_info.vue')), 'receipt/receipt_info')
const ReceiptAdd = resolve => require.ensure([], () => resolve(require('../modules/receipt/receipt_add.vue')), 'receipt/receipt_add')

//请休假管理
const Attendance = resolve => require.ensure([], () => resolve(require('../modules/attendance/index.vue')), 'attendance/index')
const AttendanceInfo = resolve => require.ensure([], () => resolve(require('../modules/attendance/attendance_info.vue')), 'attendance/attendance_info')
const AttendanceAdd = resolve => require.ensure([], () => resolve(require('../modules/attendance/attendance_add.vue')), 'attendance/attendance_add')

//待办事项
const WorkTodo = resolve => require.ensure([], () => resolve(require('../modules/work/index.vue')), 'work/index')
//制度建设
const Institution = resolve => require.ensure([], () => resolve(require('../modules/institution/index.vue')), 'institution/index')
const InstitutionInfo = resolve => require.ensure([], () => resolve(require('../modules/institution/institution_info.vue')), 'institution/institution_info')
//公告
const Notice = resolve => require.ensure([], () => resolve(require('../modules/notice/index.vue')), 'notice/index')
const NoticeInfo = resolve => require.ensure([], () => resolve(require('../modules/notice/notic_info.vue')), 'notice/notic_info')
//意见
const MyComment = resolve => require.ensure([], () => resolve(require('../modules/comment/index.vue')), 'comment/index')
//我
const About = resolve => require.ensure([], () => resolve(require('../modules/about/index.vue')), 'about/index')

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Home',
      component: Home,
      children: [
        { 
          path : '', 
          redirect: '/issue'
        },
        {
          path : '/issue',
          component: Issue,
          children: [
            {
              path: '', 
              redirect: '/issue/ysh'
            },
            {
              path: '/issue/ysh',
              component: Issue4ysh
            },
            {
              path: '/issue/dsh',
              component: Issue4dsh
            },
            {
              path: '/issue/spz',
              component: Issue4spz
            },
            {
              path: '/issue/zxz',
              component: Issue4zxz
            }
          ]
        },
        {
          path : '/meeting/todo/:status',
          component: Meeting,
          children:[
            {
              path: '/meeting/todo/my',
              component: Meeting4my
            },
            {
              path: '/meeting/todo/dcjhy',
               component: Meeting4djchy
             },
            {
              path: '/meeting/todo/dsyhy', 
              component: Meeting4dsyhy
            }
          ] 
        },
        {
        	path: '/decision/:status',
        	component: Decision,
        	children:[
        		{
              path: '/decision/exe',
              component: DecisionExe
            },
            {
              path: '/decision/yjc',
              component: DecisionYjc
            }
        	]
        },
        {
		      path: '/About',
		      component: About
		    }
      ]
    },
    {
      path : '/issue/:id(\\d+)',
      component: IssueInfo
    },
    {
      path : '/meeting/:id(\\d+)',
      component: MeetingInfo
    },
    {
      path : '/decision/:id(\\d+)',
      component: DecisionInfo
    },
    //请休假管理
    {
      path : '/attendance',
      component: Attendance
    },
    //请休假管理详情
    {
      path : '/attendance/:id(\\d+)',
      component: AttendanceInfo
    },
    //请休假管理新增
    {
      path : '/attendance/add',
      component: AttendanceAdd
    },
    //报销管理
    {
      path : '/receipt',
      component: Receipt
    },
    //报销管理详情
    {
      path : '/receipt/:id(\\d+)',
      component: ReceiptInfo
    },
    //报销新增
    {
      path : '/receipt/add',
      component: ReceiptAdd
    },
    //外出管理
    {
      path : '/outside',
      component: Outside
    },
    //外出管理详情
    {
      path : '/outside/:id(\\d+)',
      component: OutsideInfo
    },
    //外出管理新增
    {
      path : '/outside/add',
      component: OutsideAdd
    },
    //待办事项
    {
    	path: '/work/todo',
      component: WorkTodo
    },
    //制度建设
    {
    	path: '/institution',
      component: Institution
    },
    //制度建设详情
    {
    	path: '/institution/:id(\\d+)',
      component: InstitutionInfo
    },
		//电子公告
    {
      path: '/notice',
      component: Notice
    },
    //电子公告详情
    {
    	path: '/notice/:id(\\d+)',
      component: NoticeInfo
    },
    {
      path : '/comment',
      component: MyComment
    }
  ]
})
