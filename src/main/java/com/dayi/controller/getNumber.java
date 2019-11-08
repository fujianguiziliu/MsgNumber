package com.dayi.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
@Controller
public class getNumber{
	 @RequestMapping("/getNumber")
	 public void getNmuber(HttpServletResponse response) throws IOException{
		
	    response.getWriter().write("1");
	 }
}
