package com.dayi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
public class DispatcherController {
	@RequestMapping("/login_page")
    public String Login_page(){
        return "login_page";
    }
	
	@RequestMapping("/SendNoteIndex")
    public String SendNoteIndex(){
        return "SendNoteIndex";
    }
	
	@RequestMapping("/OrderCenter")
    public String OrderCenter(){
        return "OrderCenter";
    }
}
