package com.eliindia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eliindia.model.Template;
import com.eliindia.service.TemplateService;

@Controller
@RequestMapping(value="/templates")
public class TemplateController {
  
  @Autowired
  TemplateService templateService;
  

  @RequestMapping(value="/saveTemplate",method = RequestMethod.GET)
  public String saveTemplate(Model model){
    Template template=new Template();
    model.addAttribute("template",template);
    return "template";
  }
  
  @RequestMapping(value="/saveTemplate",method = RequestMethod.POST)
  public String templateSave(@ModelAttribute  Template template,Model model){
    templateService.saveTemplate(template);
    model.addAttribute("templates",templateService.getAllTemplates());
    
    return "templates";
  }
  
  
  @RequestMapping(value="/editTemplate/{id}",method = RequestMethod.GET)
  public String editTemplate(@PathVariable("id") Long id,Model model){
    model.addAttribute("template",templateService.getTemplate(id));
    return "editTemplate";
  }
  
  
  @RequestMapping(value="/getContent/{id}",method = RequestMethod.GET)
  public @ResponseBody String templateContent(@PathVariable("id") String id,Model model){
    Template template=templateService.getTemplate(Long.parseLong(id));
    
    model.addAttribute("content",templateService.getTemplate(Long.parseLong(id)));
    
    return template.getContent();
  }
  
  @RequestMapping(value="/printTemplate/{id}",method = RequestMethod.GET)
  public String printTemplate(@PathVariable("id") Long id,Model model){
    model.addAttribute("template",templateService.getTemplate(id));
    return "printTemplate";
  }
  
  
  
  @RequestMapping(value="/hi",method = RequestMethod.GET)
  public String welcome(Model model){
    Template template=new Template();
    model.addAttribute("template",template);
    return "hi";
  }
  
}
