const express = require('express');
const FrontendController = require('../controller/FrontendController');
const AdminController = require('../controller/AdminController');
const TeacherController = require('../controller/TeacherController');
const BlogController = require('../controller/BlogController');
const CategoryController =  require("../controller/CategoryController");
const checkuserauth = require('../middleware/auth');
const router = express.Router();
// FrontendController
router.get('/',FrontendController.index);
router.get('/dindex',FrontendController.dindex);
router.get('/about',FrontendController.about);
router.get('/dabout',FrontendController.dabout);
router.get('/contact',checkuserauth,FrontendController.contact);
router.get('/bloglist',checkuserauth,FrontendController.bloglist);
router.get('/login',FrontendController.login);
router.get('/logout',FrontendController.logout);
router.get('/detail/:_id',checkuserauth,FrontendController.detail);
// AdminController
router.get('/admin/dashboard',checkuserauth,AdminController.dashboard);
router.get('/admin/register',AdminController.register);
router.post('/admin/signup',AdminController.signup);
router.post('/verifylogin',AdminController.verifylogin);
// TeacherController
router.get('/teacher/create',TeacherController.create);
router.get('/teacher/display',TeacherController.display);
// BlogController
router.get('/admin/blog/display',checkuserauth,BlogController.display);
router.get('/admin/blog/create',checkuserauth,BlogController.create);
router.get('/admin/blog/view/:_id',checkuserauth,BlogController.viewblog);
router.get('/admin/blog/edit/:_id',checkuserauth,BlogController.editblog);
router.get('/admin/blog/delete/:_id',checkuserauth,BlogController.deleteblog);
router.post('/bloginsert',checkuserauth,BlogController.bloginsert);
router.post('/blogupdate/:_id',checkuserauth,BlogController.blogupdate);
// CategoryController
router.get('/admin/category/display',checkuserauth,CategoryController.display);
router.get('/admin/category/create',checkuserauth,CategoryController.create);
router.post('/categoryinsert',checkuserauth,CategoryController.categoryinsert);
router.post('/categoryupdate/:_id',checkuserauth,CategoryController.categoryupdate);
router.get('/admin/category/view/:_id',checkuserauth,CategoryController.catviewblog);
router.get('/admin/category/edit/:_id',checkuserauth,CategoryController.cateditblog);
router.get('/admin/category/delete/:_id',checkuserauth,CategoryController.catdeleteblog);
module.exports = router;