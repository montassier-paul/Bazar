# -*- coding: utf-8 -*-
"""
Created on Fri May 20 09:45:44 2022

@projet: Bazar

@author: Montassier Paul

@description: API_microservice_IA_clothes_detection  
"""

import argparse
import io
from PIL import Image
from flask import Flask, request
from server_functions import get_model, get_list_models, image_resizig





app = Flask(__name__)



@app.route("/",methods=['GET','POST'])
def index():
    """
    

    Returns
    -------
    dict
        DESCRIPTION. Check if the server works. Check get and post method

    """
    
    if request.method=='GET':
        
        return {'msg' : "Get ok"}   
    
    else:      
        request_data = request.get_json()
        msg = request_data['msg']
        return {'msg' : msg}
        
@app.route("/models",methods=['GET'])
def get_models():
    """
    

    Returns
    -------
    dict
        DESCRIPTION.Return list of trained models who exist on the server

    """
    
    list_models = get_list_models()    
    
    return {"models" : list_models}

@app.route("/new_conf",methods=['POST'])
def new_conf(): 
    """
    

    Returns
    -------
    dict
        DESCRIPTION. Modify the confidence coefficient of the model.
        The confidence coefficient is used to determine when the model deems 
        that it has detected a clothing

    """


    request_data = request.get_json()
    new_conf = float(request_data['conf'])
    model.conf = new_conf

    return  {'msg' : "New confidence threshold applied"}
     
@app.route("/model_conf",methods=['Get'])
def get_conf():
    """
    

    Returns
    -------
    dict
        DESCRIPTION. Get the model confidence coefficient

    """
    return {'conf': model.conf }

@app.route("/model_name",methods=['Get'])
def get_model_name():
    """
    

    Returns
    -------
    dict
        DESCRIPTION. Get the actual model working on the server

    """
    return {'model_name': model_name }

@app.route("/switch_model",methods=['POST'])
def switch_model():
    """
    

    Returns
    -------
    dict
        DESCRIPTION. Change of model

    """
    global model_name
    global model
    if not request.method == "POST":
        return
    
    request_data = request.get_json()    
    new_model = request_data["new_model"] 
    list_models = get_list_models()    
    if new_model in list_models:
        model_name = new_model
        model = get_model(new_model + ".pt")
        
        return {"msg": "le modèle à bien été changé"}
    
    else : 
        return {"msg": "Not in list_models"}

@app.route("/object_detection", methods=["POST"])
def predict():
    """
    

    Returns
    -------
    dict
        DESCRIPTION. Predict clothes from image. 
        Return detected clothes

    """
    
    if not request.method == "POST":
        
        return

    if request.files.get("image"):
        image_file = request.files["image"]
        image_bytes = image_file.read()

        img = Image.open(io.BytesIO(image_bytes))
        img = image_resizig(img)

        results = model(img, size=300)
        data = results.pandas().xyxy[0].to_json(orient="records")
        
        return {"result": data}



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask API IA clothes detection")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    args = parser.parse_args()
    model_name = 'Fashion_Datasets_50_labels_V1'
    model = get_model(model_name + ".pt")  
    
    app.run(host="0.0.0.0", port=args.port)  