package com.eliindia.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eliindia.model.Template;
import com.eliindia.repo.TemplateRepository;

@Service
@Transactional
public class TemplateService {
  
  public TemplateRepository templateRepo;
  
  @Autowired
  public TemplateService(TemplateRepository repo) {
    this.templateRepo=repo;
  }
  
  public Template getTemplate(Long id){
    return templateRepo.findOne(id);
  }
  
  public void saveTemplate(Template template){
    
    templateRepo.save(template);
  }
  
  public List<Template> getAllTemplates(){
    return templateRepo.findAll();
  }
}
