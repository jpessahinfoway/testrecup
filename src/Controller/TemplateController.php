<?php

namespace App\Controller;

use App\Entity\Template;
use App\Entity\Zone;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Routing\Annotation\Route;

class TemplateController extends AbstractController
{

    /**
     * @Route("/template", name="templateAccueil")
     */
    public function index()
    {
        return $this->render('template/accueil/index.html.twig', [
            'controller_name' => 'TemplateController',
        ]);
    }

    /**
     * @Route("/template/stage1/create", name="templateStage1",methods="get")
     */
    public function stage1Creation(\Symfony\Component\HttpFoundation\Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $templateName = $request->get('name');
        $orientation = $request->get('orientation');
        $template = $em->getRepository(template::class)->findAll();
        return $this->render('template/create/index.html.twig', [
            'controller_name' => 'TemplateController',
            'templateName'    => $templateName,
            'orientation'     => $orientation,
        ]);
    }


    /**
     * @Route("/template/test", name="mytest",methods="post")
     */
    public function test(Request $request)
    {

        $test = $request->get('test');

        var_dump($test);

        return $this->render('template/test.html.twig', [
            'test'   => $test,
        ]);
    }

    /**
     * @Route("/template/create/{name}/{format}", name="templateCreation",requirements={
     *   "format" = "H|V"
     * })
     */
    public function create($name,$format)
    {

        return $this->render('template/creation.html.twig', [
            'controller_name' => 'TemplateController',
            'templateName'   => $name,
            'templateFormat' => $format
        ]);
    }
}
