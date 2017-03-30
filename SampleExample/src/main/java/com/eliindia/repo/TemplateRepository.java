package com.eliindia.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eliindia.model.Template;

public interface TemplateRepository extends JpaRepository<Template, Long> {

}
