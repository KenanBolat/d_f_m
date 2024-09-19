from satpy.scene import Scene
from satpy import find_files_and_readers

# define path to FCI test data folder
path_to_data = '/home/knn/Downloads/MTG/202408200015/'

# find files and assign the FCI reader
files = find_files_and_readers(base_dir=path_to_data, reader='seviri_l1b_hrit')

# create an FCI scene from the selected files
scn = Scene(filenames=files)

# print available dataset names for this scene (e.g. 'vis_04', 'vis_05','ir_38',...)
print(scn.available_dataset_names())

# print available composite names for this scene (e.g. 'natural_color', 'airmass', 'convection',...)
print(scn.available_composite_names())

# load the datasets/composites of interest
scn.load(['natural_color','vis_04'], upper_right_corner='NE')
# note: the data inside the FCI files is stored upside down. The upper_right_corner='NE' argument
# flips it automatically in upright position.

# you can access the values of a dataset as a Numpy array with
vis_04_values = scn['vis_04'].values

# resample the scene to a specified area (e.g. "eurol1" for Europe in 1km resolution)
scn_resampled = scn.resample("eurol", resampler='nearest', radius_of_influence=5000)

# save the resampled dataset/composite to disk
scn_resampled.save_dataset("natural_color", filename='./fci_natural_color_resampled.png')