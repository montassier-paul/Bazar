# -*- coding: utf-8 -*-
"""
Created on Fri May 20 09:45:44 2022

@projet: Bazar

@author: Montassier Paul

@description: functions used by the API
"""


import torch
from PIL import Image
import os


def get_model(model_name = 'Fashion_Datasets_50_labels_V1.pt'):
    """
    

    Parameters
    ----------
    model_name : string, optional
        DESCRIPTION. Name of model weights. 
        The default is 'Fashion_Datasets_50_labels_V1.pt'.
        

    Returns
    -------
    model : torch model
        DESCRIPTION. Yolov5 model with the corresponding weights

    """
    
    #check if the model file exist
    if( not os.path.isfile('models/' + model_name)): 
        print("error : the model does not exist ")
        
    
    else: 
        model = torch.hub.load('./yolov5', 'custom', path='./models/'  + model_name, source='local')
        model.conf = 0.1
        return model


def get_list_models():
    """
    

    Returns
    -------
    list_models : List of strings
        DESCRIPTION. List of model weights name 

    """
    
    list_models = os.listdir("models/")
    for k in range(len(list_models)):
        list_models[k] = list_models[k].split('.')[0]
        
    return list_models


def image_resizig(image, target_size = 300, fill_color=(0, 0, 0)):
    """
    

    Parameters
    ----------
    image : PIL Image object
        DESCRIPTION. fashion image to analyze to find the clothes
    target_size : int, optional
        DESCRIPTION. Image size used during the model training.
        The default is 300.
    fill_color : tuple, optional
        DESCRIPTION. Fill-color used during the training.
        The default is (0, 0, 0).

    Returns
    -------
    new_image : PIL Image object
        DESCRIPTION. Image resized in order to fit with the model training parameters

    """
    
    image_w, image_h = image.size 
    
    #create background
    new_image = Image.new('RGB', (target_size, target_size), fill_color)
    
    #add image, image cropped if dimensions > (300, 300)
    new_image.paste(image.crop((0, 0, min(target_size, image_w), min(target_size, image_h))),
                    (int((target_size - min(target_size, image_w)) / 2), int((target_size - min(target_size, image_h)) / 2)))                          
    
    
       
    return new_image