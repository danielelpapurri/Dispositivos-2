import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { router } from 'expo-router';


export default function HomeScreen() {

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contenido}
    >

      <View style={styles.header}>

        <Text style={styles.logo}>
          Coffee App
        </Text>

        <Text style={styles.titulo}>
          Tu café, tu momento
        </Text>

        <Text style={styles.descripcion}>
          Descubre nuestros cafés preparados especialmente para ti.
        </Text>

      </View>


      <Text style={styles.seccionTitulo}>
        Recomendados
      </Text>


      <View style={styles.tarjeta}>

        <Text style={styles.productoTitulo}>
          Espresso
        </Text>

        <Text style={styles.productoDescripcion}>
          Café intenso y tradicional
        </Text>

        <Text style={styles.precio}>
          $6.000
        </Text>

      </View>


      <View style={styles.tarjeta}>

        <Text style={styles.productoTitulo}>
          Cappuccino
        </Text>

        <Text style={styles.productoDescripcion}>
          Espresso, leche y espuma
        </Text>

        <Text style={styles.precio}>
          $8.500
        </Text>

      </View>


      <Pressable
        style={styles.boton}
        onPress={() => router.push('/menu')}
      >

        <Text style={styles.botonTexto}>
          Ver menú completo
        </Text>

      </Pressable>


      <Pressable
        style={styles.botonSecundario}
        onPress={() => router.push('/contacto')}
      >

        <Text style={styles.botonSecundarioTexto}>
          Contacto
        </Text>

      </Pressable>

    </ScrollView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F3EF',
  },

  contenido: {
    padding: 25,
  },

  header: {
    marginTop: 20,
    marginBottom: 30,
  },

  logo: {
    fontSize: 16,
    color: '#8D6E63',
    fontWeight: 'bold',
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 5,
  },

  descripcion: {
    fontSize: 15,
    color: '#795548',
    marginTop: 10,
    lineHeight: 22,
  },

  seccionTitulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 15,
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
  },

  productoTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#4E342E',
  },

  productoDescripcion: {
    color: '#8D6E63',
    marginTop: 5,
  },

  precio: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#6D4C41',
    marginTop: 10,
  },

  boton: {
    backgroundColor: '#6D4C41',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
  },

  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botonSecundario: {
    borderWidth: 1,
    borderColor: '#6D4C41',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 12,
  },

  botonSecundarioTexto: {
    color: '#6D4C41',
    fontWeight: 'bold',
  },

});
