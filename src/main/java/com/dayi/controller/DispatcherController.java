package com.dayi.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;



@Controller
public class DispatcherController {
	@RequestMapping("/login_page")
    public String Login_page(){
        return "login_page";
    }
	
	@RequestMapping("/SendNoteIndex")
    public void SendNoteIndex(HttpServletResponse response) throws IOException{
		response.getWriter().write("1");
	}
	
	@RequestMapping("/OrderCenter")
    public void OrderCenter(HttpServletResponse response) throws IOException{
		   String str = "1509707,1582584,1309933,1569338,1869330,1821532,1879332,1879333,1879337,1879463,1319587,1529403,1556967,1539330,1313933,1332130,1821536,1821983,1319589,1529330,1529331,1559334,1524930,1524936,1534933,1535233,1509551,1821963,1879336,1879464,1311947,1529368,1537917,1556969,1322042,1509553,1502593,1519337,1519339,1821539,1879460,1879461,1512045,1537918,1509706,1829333,1336933,1529333,1556970,1315018,1524932,1803462,1829332,1829338,1519330,1519332,1821537,1821993,1512044,1509705,1869332,1519335,1879462,1529404,1537919,1539333,1874095,1323933,1524933,1533703,1535207,1819332,1829330,1829403,1821533,1539053,1534673,1819331,1368947,1820933,1829331,1519331,1821973,1879339,1529334,1529367,1529405,1304299,1815223,1809336,1534803,1535206,1810933,1819330,1829405,1821538,1539331,1533603,1535205,1829336";		
		   String[] res = str.split(",");
//		    List<String> list = new ArrayList<String>();
		    String data = "";
		    for (int i = 0; i < res.length; i++) {
		     for (int j = 0; j < 518; j++) {
//		      System.out.println(res[i]+(int)((Math.random()*9+1)*1000));
//		      list.add(res[i]+(int)((Math.random()*9+1)*1000));
		      data = data + res[i]+(int)((Math.random()*9+1)*1000)+"\n";
		     }
		  }
		    Gson gson = new Gson();
		    response.getWriter().write(data);
    }
	
	@RequestMapping("/NewFile")
    public String NewFile(){
        return "NewFile";
    }
	
	
	
	
	
}
