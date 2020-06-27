# Image Classifiers - Various Concepts

### [Visit the App](https://www.unflasked.com/)

<br>

![asd](https://user-images.githubusercontent.com/26208598/84371745-072b9500-abd2-11ea-9b2b-377a3ffa1a81.PNG)

<br>




### Image Content Classification with Tensorflow

Application of Google-made image content classifier built with Tensorflow. Training this kind of model in home conditions would took an eternity, that's why it was downloaded from 
[official website](https://www.tensorflow.org/tutorials/images/image_recognition). Model accuracy is amazing.

*(Heroku-hosted app works only with small photos with white background due to limited memory, works perfect on local hosts)*

<br>

![ds](https://user-images.githubusercontent.com/26208598/85521461-3099e700-b5fc-11ea-860b-fa05ddf93605.PNG)


<br>


### Cat vs Dog Classifier with Keras & SK

Image classifier trained to distinct between cats and dogs images. Convolutional Neural Network was built with Keras & Tensorflow(GPU).

![cat](https://user-images.githubusercontent.com/26208598/85835745-7c2fca80-b78d-11ea-8b5e-4ac2921e14c1.PNG)


#### CONVOLUTIONAL NEURAL NETWORK CHARACTERISTICS

1. Image Input Shape - 128,128,3, activation - relu
2. Three additional Convolutional Layers (batch size - respectively 32,64,128, dropout rate - 0.25,0.2,0.3)
3. Units in hidden layer - 128
4. Compiler - optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy']
5. Acc - 89% Loss - 25% (approx 30min/epoch on GPU)
6. CNN Code Location: deep_learning/ConvolutionalNeuralNetwork.py

<br>

![3](https://user-images.githubusercontent.com/26208598/56462834-c49d6c80-63c1-11e9-9234-6c322ab1fb30.JPG)


<br>


### Digit Recognition with Keras & Ajax.js

Hand-Written Digit Recognition based on MNIST Dataset. Convolutional Neural Network was built with Keras & Tensorflow(GPU). 
Heroku-hosted web application was built with Flask framework, Ajax & FileSaver. 

[MNIST Dataset](http://yann.lecun.com/exdb/mnist/)

<br>

![asd](https://user-images.githubusercontent.com/26208598/85919256-a3f06280-b861-11ea-854d-05deda33e34b.PNG)


<br>

