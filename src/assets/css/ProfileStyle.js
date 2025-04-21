import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#FF6347',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  mainContainer: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: -40,
  },
  avatarContainer: {
    zIndex: 1,
    backgroundColor: '#FFF',
    width: 120,
    height: 120,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#FF6347',
    borderWidth: 2,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 15,
  },
  infoContainer: {
    padding: 20,
    marginTop: 60,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F00',
    paddingVertical: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F00',
    paddingVertical: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutIcon: {
    marginLeft: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },

  activeInput: {
    borderColor: '#FF4B3A',
    borderWidth: 1,
  },

  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },

  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 5,
  },

  // Gender selection container
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  genderButton: {
    width: '48%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },

  activeGender: {
    borderColor: '#FF4B3A',
    backgroundColor: 'rgba(255, 75, 58, 0.1)',
  },

  genderText: {
    fontSize: 16,
    color: '#333',
  },
  activeGenderText: {
    color: '#FF4B3A',
  },

  mapButtonContainer: {
    position: 'absolute',
    right: 10,
    top: 12,
    zIndex: 1,
  },

  mapButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },

  cameraIconContainer: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: '#FF4B3A',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
export default styles;
