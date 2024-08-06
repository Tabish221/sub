
<!-- https://www.youtube.com/watch?v=WOB7mNFASTI -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Three.js GLTFLoader Example</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }

        section {
          height: 100vh;
          width: 100%;
          background-color: #000;
        }

        .obj1 {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2;
        }
    </style>
</head>
<body>
        <canvas class="obj1"></canvas>
    <section></section>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
    <script src="main.js"></script>
</body>
</html>
